import React, { useCallback, useEffect, useMemo, useState } from "react";
import SDK from "@hyperledger/identus-sdk";

import { MessagesContext } from "../context";
import { useAgent, useDatabase, useHolder } from "../hooks";

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
    const { state: dbState } = useDatabase();
    const { 
        readMessage: readMessageDB, 
        deleteMessage: deleteMessageDB, 
        getMessages: getMessagesDB
    } = useDatabase();

    const [messages, setMessages] = useState<MessageWithReadStatus[]>([]);
    // Memoized computed values to avoid recalculation on every render
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
    const fetchMessages = useCallback(async () => {
        if (dbState === "loaded") {
            try {
                const dbMessages = await getMessagesDB();
                // Filter out pickup/delivery messages entirely
                const filteredMessages = dbMessages.filter(({ message }) => 
                    !isPickupDeliveryMessage(message)
                );
                setMessages(filteredMessages);
                return filteredMessages;
            } catch (error) {
                console.error("Failed to fetch messages:", error);
                return [];
            }
        }
        return [];
    }, [getMessagesDB, dbState]);

    // Handle new real-time messages
    const handleNewMessages = useCallback(async (newMessages: SDK.Domain.Message[]) => {
        await Promise.all(
            newMessages
                .filter((message) => message.piuri === SDK.ProtocolType.DidcommIssueCredential)
                .map(async (message) => {
                    return agent?.handle(message);
                })
        );
        setMessages(prev => {
            const updatedMessages = [...prev];
            
            newMessages.forEach(newMessage => {
                // Skip pickup/delivery messages entirely
                if (isPickupDeliveryMessage(newMessage)) {
                    return;
                }

                const existingIndex = updatedMessages.findIndex(
                    item => item.message.id === newMessage.id || item.message.uuid === newMessage.uuid
                );

                if (existingIndex !== -1) {
                    // Update existing message and preserve read status
                    updatedMessages[existingIndex] = {
                        message: newMessage,
                        read: newMessage.direction === SDK.Domain.MessageDirection.RECEIVED ? updatedMessages[existingIndex].read : true          
                    };
                } else {
                    // New message - add as unread
                    updatedMessages.push({ 
                        message: newMessage, 
                        read: newMessage.direction === SDK.Domain.MessageDirection.RECEIVED ? false : true
                    });
                }
            });
            
            return updatedMessages;
        });
    }, [agent]);

    // Mark message as read - update both DB and local state
    const readMessage = useCallback(async (message: SDK.Domain.Message) => {
        try {
            await readMessageDB(message);
            
            // Update local state immediately without refetching
            setMessages(prev => 
                prev.map(item => 
                    item.message.id === message.id 
                        ? { ...item, read: true }
                        : item
                )
            );
        } catch (error) {
            console.error("Failed to mark message as read:", error);
        }
    }, [readMessageDB]);

    // Delete message - remove from both DB and local state
    const deleteMessage = useCallback(async (message: SDK.Domain.Message) => {
        try {
            await deleteMessageDB(message);
            
            // Remove from local state immediately without refetching
            setMessages(prev => 
                prev.filter(item => item.message.uuid !== message.uuid)
            );
        } catch (error) {
            console.error("Failed to delete message:", error);
        }
    }, [deleteMessageDB]);

    // Initial load effect
    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // Set up real-time message listener
    useEffect(() => {
        if (agentState === SDK.Domain.Startable.State.RUNNING && agent) {
            agent.addListener(SDK.ListenerKey.MESSAGE, handleNewMessages);
            return () => {
                agent.removeListener(SDK.ListenerKey.MESSAGE, handleNewMessages);
            };
        }
    }, [agent, handleNewMessages, agentState]);
    

    const contextValue = useMemo(() => ({
        messages,
        unreadMessages,
        receivedMessages,
        sentMessages,
        readMessage,
        deleteMessage,
        getMessages: fetchMessages
    }), [
        messages,
        unreadMessages,
        receivedMessages,
        sentMessages,
        readMessage,
        deleteMessage,
        fetchMessages
    ]);

    return (
        <MessagesContext.Provider value={contextValue}>
            {children}
        </MessagesContext.Provider>
    );
}
