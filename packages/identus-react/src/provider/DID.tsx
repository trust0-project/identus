import React, { useCallback, useState } from "react";
import SDK from "@hyperledger/identus-sdk";
import { PeerDIDContext, PrismDIDContext } from "../context";
import { useAgent, useDatabase } from "../hooks";

// Custom hook to handle common DID creation logic
function useDIDCreation<T>(
    createDIDFn: (agent: SDK.Agent) => Promise<T>
) {
    const { agent, state } = useAgent();
    const [did, setDid] = useState<T | null>(null);
    const create = useCallback(async () => {
        if (!agent || state !== SDK.Domain.Startable.State.RUNNING) {
            throw new Error('Agent not found or not running');
        }
        const newDID = await createDIDFn(agent);
        setDid(newDID);
        return newDID;
    }, [agent, state, createDIDFn]);
    return { did, create };
}

export function PrismDIDProvider({ children }: { children: React.ReactNode }) {
    const { agent, state } = useAgent();
    const {db, state: dbState, getGroupedDIDs} = useDatabase();
    const { did, create } = useDIDCreation(
       async  (agent) => {
        const {prism = []} = await getGroupedDIDs();
        const keyPathIndex = prism.length + 1;
        return agent.createNewPrismDID('did', [], keyPathIndex)
       }
    );

    const isPublished = useCallback(async (did: SDK.Domain.DID) => {
        if (!db || dbState !== 'loaded') {
            throw new Error('Database not found or not loaded');
        }
        const dbDID = await db.collections.dids.findById(did.uuid);
        return dbDID?.status === "published"
    }, [agent, state]);
    
    return (
        <PrismDIDContext.Provider value={{ prismDID: did, create, isPublished }}>
            {children}
        </PrismDIDContext.Provider>
    );
}

export function PeerDIDProvider({ children }: { children: React.ReactNode }) {
    const { did, create } = useDIDCreation(
        (agent) => agent.createNewPeerDID([], true)
    );

    return (
        <PeerDIDContext.Provider value={{ peerDID: did, create }}>
            {children}
        </PeerDIDContext.Provider>
    );
}