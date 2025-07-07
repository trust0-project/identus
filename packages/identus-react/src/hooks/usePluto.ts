import SDK from "@hyperledger/identus-sdk";
import { createStore } from "@trust0/identus-store";
import { StorageType } from "@trust0/ridb";
import { BaseStorage } from "@trust0/ridb-core";
import { useMemo } from "react";
import { schemas } from "../db";
import { useApollo } from "./useApollo";
import { useDatabase } from "./useDatabase";

/**
 * Creates and returns a memoized Pluto instance for persistent storage operations.
 * 
 * Pluto is the storage layer of the Identus SDK that handles persistence of credentials,
 * DIDs, keys, and other identity-related data. It supports multiple storage backends.
 * 
 * @param {typeof BaseStorage | StorageType} storageType - Storage backend to use (defaults to IndexedDB)
 * @returns Pluto Context
 *
 */
export function usePluto(storageType: typeof BaseStorage | StorageType = StorageType.IndexDB) {
    const {db} = useDatabase()
    const store = useMemo(() => createStore({ db, storageType }), [db])
    const apollo = useApollo()
    const pluto = useMemo(() => new SDK.Pluto(store, apollo), [store, apollo])
    return pluto;
}