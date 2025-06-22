import {
    RIDB,
    StorageType
} from '@trust0/ridb';
import SDK from '@hyperledger/identus-sdk';
import { 
    BaseStorage, 
    QueryType, 
    SchemaTypeRecord 
} from '@trust0/ridb-core';

export type StoreTypes<T extends SchemaTypeRecord> =  {
    db: RIDB<T>,
    password?: string,
    storageType: typeof BaseStorage | StorageType
}

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
export const createStore = <T extends SchemaTypeRecord>(
  options: StoreTypes<T>
): SDK.Pluto.Store => {
    const { db, password, storageType } = options;
    const parseName = (collectionName: keyof T): keyof T => {
        const name = 
            String(collectionName)
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .toLowerCase() as keyof T;

        if (!db.collections[name]) {
            throw new Error(`Collection ${String(name)} does not exist`)
        }
        return name as keyof T;
    }
    return {
        async query(table: string, query?: QueryType<any>): Promise<any[]> {
            const collectionName = parseName(table);
            const collection = db.collections[collectionName]!;
            const ridbQuery = (query as any)?.selector || query || {}
            return collection.find(ridbQuery as any) as any
        },
        async insert(table: string, model: SDK.Domain.Pluto.Storable): Promise<void> {
            const collectionName = parseName(table);
            const collection = db.collections[collectionName]!
            await collection.create(model as any)
        },
        async update(table: string, model: SDK.Domain.Pluto.Storable): Promise<void> {
            const collectionName = parseName(table);
            const collection = db.collections[collectionName]!
            await collection.update(model as any)
        },
        async delete(table: string, uuid: string): Promise<void> {
            const collectionName = parseName(table);
            const collection = db.collections[collectionName]!
            await collection.delete(uuid)
        },
        async start() {
            if (!db.started) {
                await db.start({ storageType, password })
            }
        },
        async stop() {
            await db.close()
        }
    }
}
