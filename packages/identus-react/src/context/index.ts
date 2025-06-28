import SDK from "@hyperledger/identus-sdk";
import { RIDB, StartOptions } from "@trust0/ridb";
import { Doc } from "@trust0/ridb-core";
import { createContext } from "react";
import { schemas } from "../db";

export const PrismDIDContext = createContext<{
    prismDID: SDK.Domain.DID | null;
    create: (alias: string) => Promise<void>;
} | undefined>(undefined);

export const PeerDIDContext = createContext<{
    peerDID: SDK.Domain.DID | null;
    create: () => Promise<void>;
} | undefined>(undefined);


export type DatabaseState = 'disconnected' | 'loading' | 'loaded' | 'error';
export type DIDAlias = {
    did: SDK.Domain.DID;
    alias?: string;
    status: string;
    keys: SDK.Domain.PrivateKey[];
}

export type GroupedDIDs = Record<string, DIDAlias[]>;
type AgentContextType = {
    agent: SDK.Agent | null;
    start: () => Promise<void>;
    stop: () => Promise<void>;
    state: SDK.Domain.Startable.State;
}

export const DatabaseContext = createContext<{
    db: RIDB<typeof schemas>;
    state: DatabaseState;
    error: Error | null;
    features: string[];
    wallet: string | null;
    pluto: SDK.Domain.Pluto;
    start: (options: StartOptions<typeof schemas>) => Promise<void>;
    getMessages: () => Promise<{ message: SDK.Domain.Message, read: boolean }[]>;
    readMessage: (message: SDK.Domain.Message) => Promise<void>;
    deleteMessage: (message: SDK.Domain.Message) => Promise<void>;
    getExtendedDIDs: () => Promise<{ did: SDK.Domain.DID, status: string, alias?: string, keys: SDK.Domain.PrivateKey[] }[]>;
    storeDID: (did: SDK.Domain.DID, keys: SDK.Domain.PrivateKey[], alias: string) => Promise<void>;
    updateDIDStatus: (did: SDK.Domain.DID, status: string) => Promise<void>;
    getIssuanceFlows: () => Promise<Doc<typeof schemas["issuance"]>[]>;
    getIssuanceFlow: (id: string) => Promise<Doc<typeof schemas["issuance"]> | null>;
    createIssuanceFlow: (issuanceFlow: Doc<typeof schemas["issuance"]>) => Promise<void>;
    updateIssuanceFlow: (issuanceFlow: Doc<typeof schemas["issuance"]>) => Promise<void>;
    deleteIssuanceFlow: (id: string) => Promise<void>;
    getSettingsByKey: (key: string) => Promise<string | null>;
    storeSettingsByKey: (key: string, value: string) => Promise<void>;
    deleteSettingsByKey: (key: string) => Promise<void>;
    getGroupedDIDs: () => Promise<GroupedDIDs>,
    getFeatures: () => Promise<void>;
    getMediator: () => Promise<SDK.Domain.DID | null>;
    getSeed: () => Promise<SDK.Domain.Seed | null>;
    getWallet: () => Promise<string | null>;
    getResolverUrl: () => Promise<string | null>;
    setMediator: (mediator: SDK.Domain.DID | null) => Promise<void>;
    setSeed: (seed: SDK.Domain.Seed) => Promise<SDK.Domain.Seed>;
    setWallet: (wallet: string | null) => Promise<void>;
    setResolverUrl: (resolverUrl: string | null) => Promise<void>;
} | undefined>(undefined);

export const AgentContext = createContext<(AgentContextType & { setAgent: (agent: SDK.Agent) => void }) | undefined>(undefined);

export const IssuerContext = createContext<AgentContextType & {
    createOOBOffer<T extends SDK.Domain.CredentialType>(
        type: T,
        id: string,
        claims: SDK.Domain.PresentationClaims<T>
    ): Promise<string>;
    issueCredential<T extends SDK.Domain.CredentialType>(
        type: T,
        message: SDK.Domain.Message,
        claims: SDK.Domain.PresentationClaims<T>,
        issuerDID: SDK.Domain.DID,
        holderDID: SDK.Domain.DID,
    ): Promise<void>;
} | undefined>(undefined);

export const VerifierContext = createContext<AgentContextType & {
    issuePresentationRequest<T extends SDK.Domain.CredentialType>(
        type: SDK.Domain.CredentialType,
        toDID: SDK.Domain.DID,
        claims: SDK.Domain.PresentationClaims<T>
    ): Promise<void>;
    verifyPresentation(
        presentation: SDK.Domain.Message,
    ): Promise<boolean>;
} | undefined>(undefined);


export const HolderContext = createContext<AgentContextType & {
    parseOOBOffer(
        offer: string,
        selfPeerDID: SDK.Domain.DID
    ): Promise<SDK.Domain.Message>;
    acceptOOBOffer(
        message: SDK.Domain.Message,
    ): Promise<void>;
    handlePresentationRequest(
        message: SDK.Domain.Message,
        credential: SDK.Domain.Credential,
    ): Promise<void>;
} | undefined>(undefined);

export const MessagesContext = createContext<{
    messages: { message: SDK.Domain.Message, read: boolean }[];
    receivedMessages: SDK.Domain.Message[];
    sentMessages: SDK.Domain.Message[];
    unreadMessages: SDK.Domain.Message[];
    readMessage: (message: SDK.Domain.Message) => Promise<void>;
    deleteMessage: (message: SDK.Domain.Message) => Promise<void>;
    getMessages: () => Promise<{ message: SDK.Domain.Message, read: boolean }[]>;
} | undefined>(undefined);

export const CredentialsContext = createContext<{
    credentials: SDK.Domain.Credential[];
    deleteCredential: (credential: SDK.Domain.Credential) => Promise<void>;
    fetchCredentials: () => Promise<SDK.Domain.Credential[]>;
} | undefined>(undefined);

export const ConnectionsContext = createContext<{
    connections: SDK.Domain.DIDPair[];
    deleteConnection: (connection: SDK.Domain.DIDPair) => Promise<void>;
} | undefined>(undefined);

