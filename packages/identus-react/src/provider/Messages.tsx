import React, { useCallback, useEffect, useMemo, useState } from "react";
import SDK from "@hyperledger/identus-sdk";

import { MessagesContext } from "../context";
import { useAgent, useDatabase } from "../hooks";


export function MessagesProvider({ children }: { children: React.ReactNode }) {
    const { agent } = useAgent();
    const { state:dbState } = useDatabase()
    const { 
        readMessage:readMessageDB, 
        deleteMessage:deleteMessageDB, 
        getMessages:getMessagesDB
    } = useDatabase();

    const [messages, setMessages] = useState<{ message: SDK.Domain.Message, read: boolean }[]>([]);

    const unreadMessages = messages.filter(({read}) => !read)
        .map(({message}) => message);

    const receivedMessages = messages
        .filter(({message}) => message.direction === SDK.Domain.MessageDirection.RECEIVED)
        .map(({message}) => message);

    const sentMessages = messages
        .filter(({message}) => message.direction === SDK.Domain.MessageDirection.SENT)
        .map(({message}) => message);

    const mergeMessages = useCallback((newMessages: SDK.Domain.Message[]) => {
        setMessages((prev) => {
            const updatedMessages = [...prev];
            newMessages.forEach((newMessage) => {
                const existingIndex = updatedMessages.findIndex((m) => m.message.uuid === newMessage.uuid);
                if (existingIndex !== -1) {
                    updatedMessages[existingIndex] = {
                        ...updatedMessages[existingIndex],
                        message: newMessage
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
    }, []);

    const getMessages = useCallback(async () => {
       if (dbState === "loaded") {
        const newMessages = await getMessagesDB();
        const newMessageArray = newMessages.map(({message}) => message);
        mergeMessages(newMessageArray);
        return newMessages;
       }
       return [];
    }, [getMessagesDB, dbState, mergeMessages]);

    useEffect(() => {
        getMessages();
    }, [getMessages]);
   
    const onMessage = useCallback(async (messages: SDK.Domain.Message[]) => {
        mergeMessages(messages);
    }, [mergeMessages]);

    useEffect(() => {
        if (agent) {
            agent.addListener(SDK.ListenerKey.MESSAGE, onMessage);
            return () => {
                agent.removeListener(SDK.ListenerKey.MESSAGE, onMessage);
            };
        }
    }, [agent, onMessage]);

    const readMessage = useCallback(async (message: SDK.Domain.Message) => {
        await readMessageDB(message);
        setMessages((prev) => 
            prev.map((m) => 
                m.message.id === message.id 
                    ? { ...m, read: true }
                    : m
            )
        );
    }, [readMessageDB]);

    const deleteMessage = useCallback(async (message: SDK.Domain.Message) => {
        await deleteMessageDB(message);
        setMessages((prev) => prev.filter((m) => m.message.id !== message.id));
    }, [deleteMessageDB]);

    return <MessagesContext.Provider value={{ 
        messages, 
        unreadMessages,
        receivedMessages,
        sentMessages,
        readMessage, 
        deleteMessage, 
        getMessages 
    }}>
        {children}
    </MessagesContext.Provider>
}
