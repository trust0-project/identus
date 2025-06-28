import React, { useCallback, useState } from "react";
import SDK from "@hyperledger/identus-sdk";

import { AgentContext } from "../context";
import { useApollo, usePluto } from "../hooks";
import { createResolver } from "../resolver";
import { MessagesProvider } from "./Messages";
import { ConnectionsProvider } from "./Connections";
import { CredentialsProvider } from "./Credentials";
import { PeerDIDProvider, PrismDIDProvider } from "./DID";
import { IssuerProvider } from "./Issuer";
import { HolderProvider } from "./HolderProvider";
import { VerifierProvider } from "./VerifierProvider";
import { hasDB } from "../utils";
import { RIDBDatabase, useRIDB } from "@trust0/ridb-react";
import { migrations, schemas } from "../db";
import { DatabaseProvider } from "./Database";

function WrappedAgentProvider({ children }: { children: React.ReactNode }) {
    const apollo = useApollo();
    const pluto = usePluto();
    const { db } = useRIDB<typeof schemas>();
    const [agent, setAgent] = useState<SDK.Agent | null>(null);
    const [state, setState] = useState<SDK.Domain.Startable.State>(SDK.Domain.Startable.State.STOPPED);

    const getSeed = useCallback(async () => {
        if (!hasDB(db)) {
            throw new Error("Database not connected");
        }
        const seeds = await db.collections.settings.find({ key: 'seed' });
        if (seeds.length) {
            return {
                value: Uint8Array.from(
                    Buffer.from(seeds[0].value, 'hex')
                )
            }
        }
        return null
    }, [db]);

    const getSettingsByKey = useCallback(async (key: string) => {
        if (!hasDB(db)) {
            throw new Error("Database not connected");
        }
        const keys = await db.collections.settings.find({ key });
        if (keys.length) {
            return keys[0].value;
        }
        return null;
    }, [db]);

    const getMediator = useCallback(async () => {
        if (!hasDB(db)) {
            throw new Error("Database not connected");
        }
        const mediatorStr = await getSettingsByKey("mediator");
        if (mediatorStr) {
            return SDK.Domain.DID.fromString(mediatorStr)
        } else if (process.env.MEDIATOR_DID !== undefined) {
            return SDK.Domain.DID.fromString(process.env.MEDIATOR_DID);
        } else if (process.env.NEXT_PUBLIC_MEDIATOR_DID !== undefined) {
            return SDK.Domain.DID.fromString(process.env.NEXT_PUBLIC_MEDIATOR_DID);
        }
        return null;
    }, [getSettingsByKey, db]);

    const getResolverUrl = useCallback(async () => {
        if (!hasDB(db)) {
            throw new Error("Database not connected");
        }
        return await getSettingsByKey("prism-resolver-url");
    }, [getSettingsByKey, db]);

    const stop = useCallback(async () => {
        setState(SDK.Domain.Startable.State.STOPPING);
        try {
            await agent?.connections.stop();
            await agent?.jobs.stop();
            setState(SDK.Domain.Startable.State.STOPPED);
        } catch (error) {
            console.log("Error stopping agent:", error);
        } finally {
            setAgent(null);
        }
    }, [agent, setState, setAgent]);

    const start = useCallback(async () => {
        setState(SDK.Domain.Startable.State.STARTING);
        const seed = await getSeed();
        if (!seed) {
            throw new Error("Seed not found");
        }
        const resolverUrl = await getResolverUrl();
        const resolvers = resolverUrl ? [createResolver(resolverUrl)] : [];
        const mediatorDID = await getMediator();
        if (!mediatorDID) {
            throw new Error("Mediator not found");
        }
        const castor = new SDK.Castor(apollo, resolvers);
        const agent = await SDK.Agent.initialize({
            apollo,
            castor,
            mediatorDID,
            pluto: pluto,
            seed
        });
        await agent.start()
        setState(SDK.Domain.Startable.State.RUNNING);
        setAgent(agent);
    }, [pluto]);
    return <AgentContext.Provider value={{ agent, setAgent, start, stop, state }}>
        <MessagesProvider>
            <ConnectionsProvider>
                <CredentialsProvider>
                    <PeerDIDProvider>
                        <PrismDIDProvider>
                            <IssuerProvider>
                                <HolderProvider>
                                    <VerifierProvider>
                                        {children}
                                    </VerifierProvider>
                                </HolderProvider>
                            </IssuerProvider>
                        </PrismDIDProvider>
                    </PeerDIDProvider>
                </CredentialsProvider>
            </ConnectionsProvider>
        </MessagesProvider>
    </AgentContext.Provider>
}

export function AgentProvider({ children }: { children: React.ReactNode }) {
    return <RIDBDatabase schemas={schemas} migrations={migrations as any}>
        <DatabaseProvider>
            <WrappedAgentProvider>
                {children}
            </WrappedAgentProvider>
        </DatabaseProvider>
    </RIDBDatabase>
}

