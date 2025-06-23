import React__default from 'react';
import SDK from '@hyperledger/identus-sdk';
import { ExtraResolver } from './hooks/index.mjs';
import '@trust0/ridb';
import './db/index.mjs';
import '@trust0/ridb-core';

declare function WithAgentProvider(options: {
    children: React__default.ReactNode;
    seed: SDK.Domain.Seed;
    resolverUrl: string;
    mediatorDID: SDK.Domain.DID;
    resolvers: ExtraResolver[];
}): React__default.JSX.Element;
declare function VerifierProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;
declare function HolderProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;
declare function IssuerProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;
declare function createAgentProvider<T extends ExtraResolver>(options: {
    seed: SDK.Domain.Seed;
    resolverUrl: string;
    mediatorDID: SDK.Domain.DID;
    resolvers: T[];
}): ({ children }: {
    children: React__default.ReactNode;
}) => React__default.JSX.Element;

declare function ConnectionsProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;

declare function CredentialsProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;

declare function MessagesProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;

export { ConnectionsProvider, CredentialsProvider, HolderProvider, IssuerProvider, MessagesProvider, VerifierProvider, WithAgentProvider, createAgentProvider };
