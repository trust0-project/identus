import React, { useCallback, useEffect, useState } from "react";
import SDK from "@hyperledger/identus-sdk";
import {  ConnectionsContext } from "../context";
import {  useAgent, useDatabase } from "../hooks";
import { hasDB } from "../utils";



export function ConnectionsProvider({ children }: { children: React.ReactNode }) {
    const { agent } = useAgent();   
    const { db, state: dbState, pluto } = useDatabase();
    const [connections, setConnections] = useState<SDK.Domain.DIDPair[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const load = useCallback(async () => {
        if (dbState === 'loaded' && !isLoaded) {
            const connections = await pluto.getAllDidPairs();
            setConnections(connections);
            setIsLoaded(true);
        }
    }, [dbState, isLoaded, pluto, setConnections, setIsLoaded]);

    useEffect(() => {
        if (dbState === 'loaded' && !isLoaded) {
            load()
        }
    }, [dbState, isLoaded, load]);
    
    const deleteConnection = useCallback(async (connection: SDK.Domain.DIDPair) => {
        if (!hasDB(db) || dbState !== "loaded") {
            throw new Error("Database not connected");
        }
        const connections = await db.collections["did-link"].find({
            $or: [
              { role: SDK.Domain.Models.DIDLink.role.pair, hostId: connection.host.toString() },
              { role: SDK.Domain.Models.DIDLink.role.pair, targetId: connection.receiver.toString() }
            ]
          })
          for (const connection of connections) {
            await db.collections["did-link"].delete(connection.uuid);
          }
    }, [db, dbState]);

    const onConnection = useCallback(async (newConnection: SDK.Domain.DIDPair) => {
        setConnections((prev) => {
            const exists = prev.some((connection) => 
                connection.host.toString() === newConnection.host.toString() &&
                connection.receiver.toString() === newConnection.receiver.toString()
            );
            if (!exists) {
                return [...prev, newConnection];
            }
            return prev;
        });
    }, []);

    useEffect(() => {
        if (agent) {
            agent.addListener(SDK.ListenerKey.CONNECTION, onConnection);
            return () => {
                agent.removeListener(SDK.ListenerKey.CONNECTION, onConnection);
            };
        }
    }, [agent, onConnection])

    return <ConnectionsContext.Provider value={{ connections, deleteConnection, load }}>
        {children}
    </ConnectionsContext.Provider>
}
