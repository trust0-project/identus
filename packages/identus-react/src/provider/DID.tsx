import React, { useCallback, useState } from "react";
import SDK from "@hyperledger/identus-sdk";
import { PeerDIDContext, PrismDIDContext } from "../context";
import { useAgent } from "../hooks";

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
    const { did, create } = useDIDCreation(
        (agent) => agent.createNewPrismDID('did', [])
    );
    
    return (
        <PrismDIDContext.Provider value={{ prismDID: did, create }}>
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