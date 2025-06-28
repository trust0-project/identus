import React, { useCallback, useEffect, useState } from "react";
import SDK from "@hyperledger/identus-sdk";

import { useRIDB } from "@trust0/ridb-react";
import { CredentialsContext } from "../context";
import { useAgent, useMessages } from "../hooks";
import { schemas } from "../db";
import { hasDB } from "../utils";

type ExtendedMessage = { message: SDK.Domain.Message; read: boolean; }

export function CredentialsProvider({ children }: { children: React.ReactNode }) {
    const { agent } = useAgent(); 
    const { messages: messagesListener } = useMessages();
    const { db, state: dbState } = useRIDB<typeof schemas>();
    const [credentials, setCredentials] = useState<SDK.Domain.Credential[]>([]);

    const filterMessages = useCallback((messages: ExtendedMessage[]) => new Set(
        messages
        .filter(({message}) => message.piuri === SDK.ProtocolType.DidcommIssueCredential)
        .map(({message}) => message.id)
    ), []);

    const fetchCredentials = useCallback(async () => {
        if (agent && dbState === "loaded") {
            const credentials = await agent?.pluto.getAllCredentials();
            setCredentials(prev => [...prev, ...credentials.filter((credential) => !prev.some((c) => c.uuid === credential.uuid))]);
            return credentials ?? [];
        }
        return []
    }, [agent, setCredentials, dbState]);

    const [
        issueCredentialMessages, 
        setIssueCredentialMessages
    ] = useState<Set<string>>(filterMessages(messagesListener))

    useEffect(() => {
        fetchCredentials()
    }, [fetchCredentials, setCredentials]);

    useEffect(() => {
        const newMessages = filterMessages(messagesListener);
        if (agent && newMessages.size > issueCredentialMessages.size) {
            if (issueCredentialMessages.size > 0) {
                const credentialMessages = messagesListener
                .filter(({message}) => message.piuri === SDK.ProtocolType.DidcommIssueCredential)
                .map(({message}) => message);
                Promise.all(credentialMessages.map((message) => agent.handle(message)))
            }
            setIssueCredentialMessages(newMessages);
        }
    }, [fetchCredentials, messagesListener, issueCredentialMessages]);

    const deleteCredential = useCallback(async (credential: SDK.Domain.Credential) => {
        if (!hasDB(db) || dbState !== "loaded") {
            throw new Error("Database not connected");
        }
        await db.collections.credentials.delete(credential.uuid);
    }, [db, dbState]);
    
    return <CredentialsContext.Provider value={{ credentials, deleteCredential, fetchCredentials }}>
        {children}
    </CredentialsContext.Provider>
}