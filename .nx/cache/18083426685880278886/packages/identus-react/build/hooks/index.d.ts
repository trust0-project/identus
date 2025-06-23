import * as _trust0_ridb from '@trust0/ridb';
import { schemas } from '../db/index.js';
import SDK from '@hyperledger/identus-sdk';
import '@trust0/ridb-core';

declare function useApollo(): SDK.Apollo;
type ExtraResolver = new (apollo: SDK.Domain.Apollo) => SDK.Domain.DIDResolver;
declare function useCastor(resolvers?: ExtraResolver[]): SDK.Castor;
declare function useAgent(): {
    agent: SDK.Agent | null;
    start: (startOptions: _trust0_ridb.StartOptions<typeof schemas>) => Promise<void>;
    stop: () => Promise<void>;
    state: SDK.Domain.Startable.State;
} & {
    setAgent: (agent: SDK.Agent) => void;
};
declare function useIssuer(): {
    agent: SDK.Agent | null;
    start: (startOptions: _trust0_ridb.StartOptions<typeof schemas>) => Promise<void>;
    stop: () => Promise<void>;
    state: SDK.Domain.Startable.State;
} & {
    createOOBOffer<T extends SDK.Domain.CredentialType>(type: T, id: string, claims: SDK.Domain.PresentationClaims<T>): Promise<string>;
    issueCredential<T extends SDK.Domain.CredentialType>(type: T, message: SDK.Domain.Message, claims: SDK.Domain.PresentationClaims<T>, issuerDID: SDK.Domain.DID, holderDID: SDK.Domain.DID): Promise<void>;
};
declare function useHolder(): {
    agent: SDK.Agent | null;
    start: (startOptions: _trust0_ridb.StartOptions<typeof schemas>) => Promise<void>;
    stop: () => Promise<void>;
    state: SDK.Domain.Startable.State;
} & {
    parseOOBOffer(offer: string, selfPeerDID: SDK.Domain.DID): Promise<SDK.Domain.Message>;
    acceptOOBOffer(message: SDK.Domain.Message): Promise<void>;
    handlePresentationRequest(message: SDK.Domain.Message, credential: SDK.Domain.Credential): Promise<void>;
};
declare function useVerifier(): {
    agent: SDK.Agent | null;
    start: (startOptions: _trust0_ridb.StartOptions<typeof schemas>) => Promise<void>;
    stop: () => Promise<void>;
    state: SDK.Domain.Startable.State;
} & {
    issuePresentationRequest<T extends SDK.Domain.CredentialType>(type: SDK.Domain.CredentialType, toDID: SDK.Domain.DID, claims: SDK.Domain.PresentationClaims<T>): Promise<void>;
    verifyPresentation(presentation: SDK.Domain.Message): Promise<boolean>;
};
declare function useMessages(): {
    messages: {
        message: SDK.Domain.Message;
        read: boolean;
    }[];
    readMessage: (message: SDK.Domain.Message) => Promise<void>;
    deleteMessage: (message: SDK.Domain.Message) => Promise<void>;
};
declare function useCredentials(): {
    credentials: SDK.Domain.Credential[];
    deleteCredential: (credential: SDK.Domain.Credential) => Promise<void>;
};

export { type ExtraResolver, useAgent, useApollo, useCastor, useCredentials, useHolder, useIssuer, useMessages, useVerifier };
