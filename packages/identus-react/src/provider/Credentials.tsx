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
        const credentials = await agent?.pluto.getAllCredentials();
        return credentials ?? [];
    }, [agent]);

    const [
        issueCredentialMessages, 
        setIssueCredentialMessages
    ] = useState<Set<string>>(filterMessages(messagesListener))

    useEffect(() => {
        fetchCredentials().then(setCredentials)
    }, [fetchCredentials, setCredentials]);

    useEffect(() => {
        const newMessages = filterMessages(messagesListener);
        if (newMessages.size > issueCredentialMessages.size) {
            setIssueCredentialMessages(newMessages);
            fetchCredentials().then(setCredentials)
        }
    }, [fetchCredentials, messagesListener, issueCredentialMessages]);

    const deleteCredential = useCallback(async (credential: SDK.Domain.Credential) => {
        if (!hasDB(db) || dbState !== "loaded") {
            throw new Error("Database not connected");
        }
        await db.collections.credentials.delete(credential.uuid);
    }, [db, dbState]);
    
    return <CredentialsContext.Provider value={{ credentials, deleteCredential }}>
        {children}
    </CredentialsContext.Provider>
}