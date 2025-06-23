import { RIDB, StorageType } from '@trust0/ridb';
import SDK from '@hyperledger/identus-sdk';
import { SchemaTypeRecord, BaseStorage } from '@trust0/ridb-core';

type StoreTypes<T extends SchemaTypeRecord> = {
    db: RIDB<T>;
    password?: string;
    storageType: typeof BaseStorage | StorageType;
};
/**
 * Creates a store implementation for the Identus SDK Pluto interface.
 *
 * @template T - The schema type record that defines the database collections structure
 * @param {StoreTypes<T>} options - The configuration options for creating the store
 * @param {RIDB<T>} options.db - The RIDB database instance with typed collections
 * @param {string} [options.password] - Optional password for database encryption
 * @param {typeof BaseStorage | StorageType} options.storageType - The storage implementation to use
 * @returns {SDK.Pluto.Store} A configured Pluto store instance that implements the SDK storage interface
 * @throws {Error} Throws an error if a referenced collection does not exist in the database
 *
 * @example
 * ```typescript
 * import { createStore } from '@identus/store';
 * import { RIDB } from '@trust0/ridb';
 * import { InMemoryStorage } from '@trust0/ridb-core';
 *
 * const db = new RIDB({ schema: mySchema });
 * const store = createStore({
 *   db,
 *   storageType: InMemoryStorage,
 *   password: 'optional-password'
 * });
 * ```
 */
declare const createStore: <T extends SchemaTypeRecord>(options: StoreTypes<T>) => SDK.Pluto.Store;

export { type StoreTypes, createStore };
