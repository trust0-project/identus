import * as React from 'react';
import SDK from '@hyperledger/identus-sdk';
import { StartOptions } from '@trust0/ridb';
import { schemas } from '../db/index.mjs';
import '@trust0/ridb-core';

declare const PrismDIDContext: React.Context<{
    did: SDK.Domain.DID | null;
    setDID: (did: string) => void;
} | undefined>;
type DatabaseState = 'disconnected' | 'loading' | 'loaded' | 'error';
type AgentContextType = {
    agent: SDK.Agent | null;
    start: (startOptions: StartOptions<typeof schemas>) => Promise<void>;
    stop: () => Promise<void>;
    state: SDK.Domain.Startable.State;
};
declare const AgentContext: React.Context<(AgentContextType & {
    setAgent: (agent: SDK.Agent) => void;
}) | undefined>;
declare const IssuerContext: React.Context<(AgentContextType & {
    createOOBOffer<T extends SDK.Domain.CredentialType>(type: T, id: string, claims: SDK.Domain.PresentationClaims<T>): Promise<string>;
    issueCredential<T extends SDK.Domain.CredentialType>(type: T, message: SDK.Domain.Message, claims: SDK.Domain.PresentationClaims<T>, issuerDID: SDK.Domain.DID, holderDID: SDK.Domain.DID): Promise<void>;
}) | undefined>;
declare const VerifierContext: React.Context<(AgentContextType & {
    issuePresentationRequest<T extends SDK.Domain.CredentialType>(type: SDK.Domain.CredentialType, toDID: SDK.Domain.DID, claims: SDK.Domain.PresentationClaims<T>): Promise<void>;
    verifyPresentation(presentation: SDK.Domain.Message): Promise<boolean>;
}) | undefined>;
declare const HolderContext: React.Context<(AgentContextType & {
    parseOOBOffer(offer: string, selfPeerDID: SDK.Domain.DID): Promise<SDK.Domain.Message>;
    acceptOOBOffer(message: SDK.Domain.Message): Promise<void>;
    handlePresentationRequest(message: SDK.Domain.Message, credential: SDK.Domain.Credential): Promise<void>;
}) | undefined>;
declare const MessagesContext: React.Context<{
    messages: {
        message: SDK.Domain.Message;
        read: boolean;
    }[];
    readMessage: (message: SDK.Domain.Message) => Promise<void>;
    deleteMessage: (message: SDK.Domain.Message) => Promise<void>;
} | undefined>;
declare const CredentialsContext: React.Context<{
    credentials: SDK.Domain.Credential[];
    deleteCredential: (credential: SDK.Domain.Credential) => Promise<void>;
} | undefined>;
declare const ConnectionsContext: React.Context<{
    connections: SDK.Domain.DIDPair[];
    deleteConnection: (connection: SDK.Domain.DIDPair) => Promise<void>;
} | undefined>;

export { AgentContext, ConnectionsContext, CredentialsContext, type DatabaseState, HolderContext, IssuerContext, MessagesContext, PrismDIDContext, VerifierContext };
