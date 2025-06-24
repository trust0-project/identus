import React, { useCallback, useEffect, useState } from "react";
import SDK from "@hyperledger/identus-sdk";

import { useRIDB } from "@trust0/ridb-react";

import {  ConnectionsContext } from "../context";
import {  useAgent } from "../hooks";
import { schemas } from "../db";
import { hasDB } from "../utils";



export function ConnectionsProvider({ children }: { children: React.ReactNode }) {
    const { agent } = useAgent();   
    const { db, state: dbState } = useRIDB<typeof schemas>();
    const [connections, setConnections] = useState<SDK.Domain.DIDPair[]>([]);

    useEffect(() => {
        if (db && dbState === 'loaded') {
            agent?.pluto.getAllDidPairs().then(setConnections)
        }
    }, [agent, db, dbState]);
    
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

    return <ConnectionsContext.Provider value={{ connections, deleteConnection }}>
        {children}
    </ConnectionsContext.Provider>
}
