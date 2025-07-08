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
    const isPickupDelivery = PICKUP_DELIVERY_PROTOCOLS.includes(message.piuri);
    console.log(`[MessagesProvider] Checking if message ${message.id} (${message.piuri}) is pickup/delivery:`, isPickupDelivery);
    return isPickupDelivery;
};

export function MessagesProvider({ children }: { children: React.ReactNode }) {
    console.log(`[MessagesProvider] Provider initializing`);
    
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

    console.log(`[MessagesProvider] Current state - Agent: ${agentState}, DB: ${dbState}, Loaded: ${isLoaded}, Messages count: ${messages.length}`);

    const unreadMessages = useMemo(() => {
        const filtered = messages
            .filter(({ read, message }) => !read && message.direction === SDK.Domain.MessageDirection.RECEIVED)
            .map(({ message }) => message);
        console.log(`[MessagesProvider] Computed unread messages: ${filtered.length} out of ${messages.length} total`);
        return filtered;
    }, [messages]);

    const receivedMessages = useMemo(() => {
        const filtered = messages
            .filter(({ message }) => message.direction === SDK.Domain.MessageDirection.RECEIVED)
            .map(({ message }) => message);
        console.log(`[MessagesProvider] Computed received messages: ${filtered.length} out of ${messages.length} total`);
        return filtered;
    }, [messages]);

    const sentMessages = useMemo(() => {
        const filtered = messages
            .filter(({ message }) => message.direction === SDK.Domain.MessageDirection.SENT)
            .map(({ message }) => message);
        console.log(`[MessagesProvider] Computed sent messages: ${filtered.length} out of ${messages.length} total`);
        return filtered;
    }, [messages]);

    // Initial fetch of messages from database
    const load = useCallback(async () => {
        console.log(`[MessagesProvider] Loading messages from database, dbState: ${dbState}`);
        
        if (dbState === "loaded") {
            try {
                console.log(`[MessagesProvider] Fetching messages from database...`);
                const dbMessages = await getMessagesDB();
                console.log(`[MessagesProvider] Retrieved ${dbMessages.length} messages from database`);
                
                // Filter out pickup/delivery messages entirely
                const filteredMessages = dbMessages.filter(({ message }) => {
                    const shouldInclude = !isPickupDeliveryMessage(message);
                    if (!shouldInclude) {
                        console.log(`[MessagesProvider] Filtering out pickup/delivery message: ${message.id} (${message.piuri})`);
                    }
                    return shouldInclude;
                });
                
                console.log(`[MessagesProvider] After filtering pickup/delivery messages: ${filteredMessages.length} remaining`);
                
                const parsedMessages = filteredMessages.map(({message, read}) => {
                    const finalRead = message.direction === SDK.Domain.MessageDirection.SENT ? true : read;
                    console.log(`[MessagesProvider] Processing message ${message.id}: direction=${message.direction}, read=${read} -> ${finalRead}`);
                    return {
                        message,
                        read: finalRead
                    };
                });
                
                console.log(`[MessagesProvider] Setting ${parsedMessages.length} messages in state`);
                setMessages(parsedMessages);
            } catch (error) {
                console.error("[MessagesProvider] Failed to fetch messages:", error);
            }
        } else {
            console.log(`[MessagesProvider] Database not ready for loading (state: ${dbState})`);
        }
    }, [getMessagesDB, dbState, isPickupDeliveryMessage]);

    // Handle new real-time messages
    const handleNewMessages = useCallback(async (newMessages: SDK.Domain.Message[]) => {
        console.log(`[MessagesProvider] Handling ${newMessages.length} new real-time messages`);
        newMessages.forEach(msg => {
            console.log(`[MessagesProvider] New message: ${msg.id} (${msg.piuri}) - Direction: ${msg.direction}`);
        });

        if (agent && agentState === SDK.Domain.Startable.State.RUNNING) {
            console.log(`[MessagesProvider] Agent is running, processing credential issuance messages`);
            const credentialMessages = newMessages.filter((message) => message.piuri === SDK.ProtocolType.DidcommIssueCredential);
            console.log(`[MessagesProvider] Found ${credentialMessages.length} credential issuance messages to handle`);
            
            await Promise.all(
                credentialMessages.map(async (message) => {
                    console.log(`[MessagesProvider] Handling credential message: ${message.id}`);
                    return agent.handle(message);
                })
            );
            
            console.log(`[MessagesProvider] Reloading credentials after handling credential messages`);
            await loadCredentials();
        } else {
            console.log(`[MessagesProvider] Agent not running (state: ${agentState}), skipping credential processing`);
        }
        
        setMessages(prev => {
            console.log(`[MessagesProvider] Updating messages state from ${prev.length} messages`);
            const updatedMessages = [...prev];
            
            newMessages.forEach(newMessage => {
                // Skip pickup/delivery messages entirely
                if (isPickupDeliveryMessage(newMessage)) {
                    console.log(`[MessagesProvider] Skipping pickup/delivery message: ${newMessage.id}`);
                    return;
                }

                const existingIndex = updatedMessages.findIndex(
                    item => item.message.id === newMessage.id || item.message.uuid === newMessage.uuid
                );

                if (existingIndex !== -1) {
                    console.log(`[MessagesProvider] Updating existing message at index ${existingIndex}: ${newMessage.id}`);
                    const previousRead = updatedMessages[existingIndex].read;
                    const newRead = newMessage.direction === SDK.Domain.MessageDirection.RECEIVED ? previousRead : true;
                    console.log(`[MessagesProvider] Message read status: ${previousRead} -> ${newRead}`);
                    
                    updatedMessages[existingIndex] = {
                        message: newMessage,
                        read: newRead        
                    };
                } else {
                    const newRead = newMessage.direction === SDK.Domain.MessageDirection.RECEIVED ? false : true;
                    console.log(`[MessagesProvider] Adding new message: ${newMessage.id}, read: ${newRead}`);
                    updatedMessages.push({ 
                        message: newMessage, 
                        read: newRead
                    });
                }
            });
            
            console.log(`[MessagesProvider] Final messages state: ${updatedMessages.length} messages`);
            return updatedMessages;
        });
    }, [agent, agentState, loadCredentials, setMessages, isPickupDeliveryMessage]);

    // Mark message as read - update both DB and local state
    const readMessage = useCallback(async (message: SDK.Domain.Message) => {
        console.log(`[MessagesProvider] Marking message as read: ${message.id} (${message.piuri})`);
        
        try {
            await readMessageDB(message);
            console.log(`[MessagesProvider] Successfully marked message as read in database: ${message.id}`);
            
            // Update local state immediately without refetching
            setMessages(prev => {
                const updated = prev.map(item => {
                    if (item.message.id === message.id || item.message.uuid === message.uuid) {
                        console.log(`[MessagesProvider] Updating local state for message: ${message.id}, read: ${item.read} -> true`);
                        return { ...item, read: true };
                    }
                    return item;
                });
                return updated;
            });
        } catch (error) {
            console.error(`[MessagesProvider] Failed to mark message as read: ${message.id}`, error);
        }
    }, [readMessageDB, setMessages]);

    // Delete message - remove from both DB and local state
    const deleteMessage = useCallback(async (message: SDK.Domain.Message) => {
        console.log(`[MessagesProvider] Deleting message: ${message.id} (${message.piuri})`);
        
        try {
            await deleteMessageDB(message);
            console.log(`[MessagesProvider] Successfully deleted message from database: ${message.id}`);
            
            setMessages(prev => {
                const filtered = prev.filter(item => item.message.uuid !== message.uuid);
                console.log(`[MessagesProvider] Removed message from local state: ${prev.length} -> ${filtered.length} messages`);
                return filtered;
            });
        } catch (error) {
            console.error(`[MessagesProvider] Failed to delete message: ${message.id}`, error);
        }
    }, [deleteMessageDB, setMessages]);

    // Initial load effect
    useEffect(() => {
        console.log(`[MessagesProvider] Load effect triggered - dbState: ${dbState}, isLoaded: ${isLoaded}`);
        
        if (dbState === "loaded" && !isLoaded) {
            console.log(`[MessagesProvider] Starting initial load...`);
            load();
            setIsLoaded(true);
            console.log(`[MessagesProvider] Set isLoaded to true`);
        }
    }, [load, dbState, isLoaded]);

    // Set up real-time message listener
    useEffect(() => {
        console.log(`[MessagesProvider] Message listener effect triggered - agentState: ${agentState}, agent: ${!!agent}`);
        
        if (agentState === SDK.Domain.Startable.State.RUNNING && agent) {
            console.log(`[MessagesProvider] Adding message listener`);
            agent.addListener(SDK.ListenerKey.MESSAGE, handleNewMessages);
            
            return () => {
                console.log(`[MessagesProvider] Removing message listener`);
                agent.removeListener(SDK.ListenerKey.MESSAGE, handleNewMessages);
            };
        } else {
            console.log(`[MessagesProvider] Agent not ready for listener (state: ${agentState}, agent: ${!!agent})`);
        }
    }, [agent, handleNewMessages, agentState]);
    
    console.log(`[MessagesProvider] Rendering with context value:`, {
        messagesCount: messages.length,
        unreadCount: unreadMessages.length,
        receivedCount: receivedMessages.length,
        sentCount: sentMessages.length
    });

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
