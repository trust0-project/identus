import React, { useCallback, useEffect, useMemo, useState } from "react";
import SDK from "@hyperledger/identus-sdk";

import { MessagesContext } from "../context";
import { useAgent, useCredentials, useDatabase } from "../hooks";

type MessageWithReadStatus = {
    message: SDK.Domain.Message;
    read: boolean;
};

// Protocol types for pickup and message delivery that should be marked as read
const PICKUP_DELIVERY_PROTOCOLS: string[] = [
    SDK.ProtocolType.PickupRequest,
    SDK.ProtocolType.PickupDelivery,
    SDK.ProtocolType.PickupStatus,
    SDK.ProtocolType.PickupReceived,
    SDK.ProtocolType.LiveDeliveryChange
];

// Helper function to check if a message is pickup/delivery related
const isPickupDeliveryMessage = (message: SDK.Domain.Message): boolean => {
    return PICKUP_DELIVERY_PROTOCOLS.includes(message.piuri);
};

export function MessagesProvider({ children }: { children: React.ReactNode }) {
    const { agent, state: agentState } = useAgent();
    const { 
        readMessage: readMessageDB, 
        deleteMessage: deleteMessageDB, 
        getMessages: getMessagesDB,
        state: dbState, 
    } = useDatabase();

    const { load: loadCredentials } = useCredentials();

    const [isLoaded, setIsLoaded] = useState(false);
    const [messages, setMessages] = useState<MessageWithReadStatus[]>([]);

    const unreadMessages = useMemo(() => 
        messages
            .filter(({ read, message }) => !read && message.direction === SDK.Domain.MessageDirection.RECEIVED)
            .map(({ message }) => message),
        [messages]
    );

    const receivedMessages = useMemo(() => 
        messages
            .filter(({ message }) => message.direction === SDK.Domain.MessageDirection.RECEIVED)
            .map(({ message }) => message),
        [messages]
    );

    const sentMessages = useMemo(() => 
        messages
            .filter(({ message }) => message.direction === SDK.Domain.MessageDirection.SENT)
            .map(({ message }) => message),
        [messages]
    );

    // Initial fetch of messages from database
    const load = useCallback(async () => {
        if (dbState === "loaded") {
            try {
                const dbMessages = await getMessagesDB();
                // Filter out pickup/delivery messages entirely
                const filteredMessages = dbMessages.filter(({ message }) => 
                    !isPickupDeliveryMessage(message)
                );
                const parsedMessages = filteredMessages.map(({message, read}) => ({
                    message,
                    read: message.direction === SDK.Domain.MessageDirection.SENT ? true: read
                }));
                
                setMessages(parsedMessages);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        }
    }, [getMessagesDB, dbState, isPickupDeliveryMessage]);

    // Handle new real-time messages
    const handleNewMessages = useCallback(async (newMessages: SDK.Domain.Message[]) => {
        if (agent && agentState === SDK.Domain.Startable.State.RUNNING) {
            await Promise.all(
                newMessages
                    .filter((message) => message.piuri === SDK.ProtocolType.DidcommIssueCredential)
                    .map((message) => agent.handle(message))
            )
            await loadCredentials()
        }
        setMessages(prev => {
            const updatedMessages = [...prev];
            
            newMessages.forEach(newMessage => {
                // Skip pickup/delivery messages entirely
                if (isPickupDeliveryMessage(newMessage)) {
                    return;
                }

                const existingIndex = updatedMessages.findIndex(
                    item => item.message.id === newMessage.id || item.message.uuid === newMessage.uuid
                );

                if (existingIndex !== -1) {
                    updatedMessages[existingIndex] = {
                        message: newMessage,
                        read: newMessage.direction === SDK.Domain.MessageDirection.RECEIVED ? updatedMessages[existingIndex].read : true          
                    };
                } else {
                    updatedMessages.push({ 
                        message: newMessage, 
                        read: newMessage.direction === SDK.Domain.MessageDirection.RECEIVED ? false : true
                    });
                }
            });
            return updatedMessages;
        });
    }, [agent, agentState, loadCredentials, setMessages, isPickupDeliveryMessage]);

    // Mark message as read - update both DB and local state
    const readMessage = useCallback(async (message: SDK.Domain.Message) => {
        await readMessageDB(message);
        // Update local state immediately without refetching
        setMessages(prev => 
            prev.map(item => 
                item.message.id === message.id || item.message.uuid === message.uuid
                    ? { ...item, read: true }
                    : item
            )
        );
    }, [readMessageDB, setMessages]);

    // Delete message - remove from both DB and local state
    const deleteMessage = useCallback(async (message: SDK.Domain.Message) => {
        await deleteMessageDB(message);
        setMessages(prev => 
            prev.filter(item => item.message.uuid !== message.uuid)
        );
    }, [deleteMessageDB, setMessages]);

    // Initial load effect
    useEffect(() => {
        if (dbState === "loaded" && !isLoaded) {
            load()
            setIsLoaded(true);
        }
    }, [load, dbState, isLoaded]);


    // Set up real-time message listener
    useEffect(() => {
        if (agentState === SDK.Domain.Startable.State.RUNNING && agent) {
            agent.addListener(SDK.ListenerKey.MESSAGE, handleNewMessages);
            return () => {
                agent.removeListener(SDK.ListenerKey.MESSAGE, handleNewMessages);
            };
        }
    }, [agent, handleNewMessages, agentState]);
    

    return (
        <MessagesContext.Provider value={{
            messages,
            unreadMessages,
            receivedMessages,
            sentMessages,
            readMessage,
            deleteMessage,
            load
        }}>
            {children}
        </MessagesContext.Provider>
    );
}
