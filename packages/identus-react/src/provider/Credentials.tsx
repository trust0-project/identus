import React, { useCallback, useEffect, useState } from "react";
import SDK from "@hyperledger/identus-sdk";

import { CredentialsContext } from "../context";
import { useDatabase } from "../hooks";
import { hasDB } from "../utils";


export function CredentialsProvider({ children }: { children: React.ReactNode }) {
    const { db, state: dbState, pluto, deleteCredential: deleteCredentialDB, getCredentials: getCredentialsDB } = useDatabase();
    const [credentials, setCredentials] = useState<SDK.Domain.Credential[]>([]);

    const fetchCredentials = useCallback(async () => {
        if (dbState === "loaded") {
            const credentials = await getCredentialsDB();
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
        await deleteCredentialDB(credential);
        setCredentials(prev => prev.filter(c => c.id !== credential.id && c.uuid !== credential.uuid));
    }, [db, dbState, deleteCredentialDB, setCredentials]);
    
    return <CredentialsContext.Provider value={{ credentials, deleteCredential, fetchCredentials }}>
        {children}
    </CredentialsContext.Provider>
}