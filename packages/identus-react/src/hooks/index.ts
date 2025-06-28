import SDK from "@hyperledger/identus-sdk";
import { useContext, useMemo } from "react";
import { AgentContext, CredentialsContext, MessagesContext, IssuerContext, HolderContext, VerifierContext, ConnectionsContext, PrismDIDContext, PeerDIDContext, DatabaseContext } from "../context";
import { useRIDB } from "@trust0/ridb-react";
import { schemas } from "../db";
import { createStore } from "@trust0/identus-store";
import { StorageType } from "@trust0/ridb";
import { BaseStorage } from "@trust0/ridb-core";

export function useApollo() {
    const apollo = useMemo(() => new SDK.Apollo(), []);
    return apollo;
}

export type ExtraResolver = new (apollo: SDK.Domain.Apollo) => SDK.Domain.DIDResolver;
export function useCastor(resolvers: ExtraResolver[] = []) {
    const apollo = useApollo();
    const castor = useMemo(() => new SDK.Castor(apollo, resolvers), [apollo, resolvers]);
    return castor;
}

export function usePrismDID() {
    const context = useContext(PrismDIDContext);
    if (!context) {
        throw new Error('usePrismDID must be used within a PrismDIDProvider');
    }
    return context;
}

export function usePluto(storageType: typeof BaseStorage | StorageType = StorageType.IndexDB) {
    const {db} = useRIDB<typeof schemas>()
    const store = useMemo(() => createStore({ db, storageType }), [db])
    const apollo = useApollo()
    const pluto = useMemo(() => new SDK.Pluto(store, apollo), [store, apollo])
    return pluto;
}

export function usePeerDID() {
    const context = useContext(PeerDIDContext);
    if (!context) {
        throw new Error('usePeerDID must be used within a PeerDIDProvider');
    }
    return context;
}

export function useAgent() {
    const context = useContext(AgentContext);
    if (!context) {
        throw new Error('useAgent must be used within a AgentProvider');
    }
    return context;
}

export function useIssuer() {
    const context = useContext(IssuerContext);
    if (!context) {
        throw new Error('useIssuer must be used within a IssuerProvider');
    }
    return context;
}

export function useHolder() {
    const context = useContext(HolderContext);
    if (!context) {
        throw new Error('useHolder must be used within a HolderProvider');
    }
    return context;
}

export function useVerifier() {
    const context = useContext(VerifierContext);
    if (!context) {
        throw new Error('useVerifier must be used within a VerifierProvider');
    }
    return context;
}

export function useMessages() {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessagesProvider');
    }
    return context;
}

export function useCredentials() {
    const context = useContext(CredentialsContext);
    if (!context) {
        throw new Error('useCredentials must be used within a CredentialsProvider');
    }
    return context;
}

export function useConnections() {
    const context = useContext(ConnectionsContext);
    if (!context) {
        throw new Error('useConnections must be used within a ConnectionsProvider');
    }
    return context;
}


export function useDatabase() {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
}
