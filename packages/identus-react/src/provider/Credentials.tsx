import React, { useCallback, useEffect, useState } from "react";
import SDK from "@hyperledger/identus-sdk";

import { CredentialsContext } from "../context";
import { useAgent, useDatabase } from "../hooks";
import { hasDB } from "../utils";


export function CredentialsProvider({ children }: { children: React.ReactNode }) {
    const { agent } = useAgent(); 
    const { db, state: dbState, pluto } = useDatabase();
    const [credentials, setCredentials] = useState<SDK.Domain.Credential[]>([]);

    const fetchCredentials = useCallback(async () => {
        if (dbState === "loaded") {
            const credentials = await pluto.getAllCredentials();
            setCredentials(prev => [...prev, ...credentials.filter((credential) => !prev.some((c) => c.id === credential.id || c.uuid === credential.uuid))]);
            return credentials ?? [];
        }
        return []
    }, [pluto, setCredentials, dbState]);

    useEffect(() => {
        fetchCredentials()
    }, [fetchCredentials, setCredentials]);

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