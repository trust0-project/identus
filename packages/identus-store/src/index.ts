import {
    RIDB,
    StorageType
} from '@trust0/ridb';
import SDK from '@hyperledger/identus-sdk';
import {
    BaseStorage,
    SchemaTypeRecord,
} from '@trust0/ridb-core';

import { schemas, migrations } from './db';

type WithStart = { start: () => Promise<void> };
type WithOptions = { password: string, storageType: typeof BaseStorage | StorageType };
type StartOptions = WithStart | WithOptions;

type DatabaseOrOptionalSchemas<T extends SchemaTypeRecord> = { db?: RIDB<T> } | { dbName: string, schemas?: T, migrations?: any };       
type CreateStoreOptions<T extends SchemaTypeRecord> = DatabaseOrOptionalSchemas<T> & StartOptions;



function getDatabase<T extends SchemaTypeRecord>(options: DatabaseOrOptionalSchemas<T>): RIDB<T> {

    if ('db' in options && options.db) {
        return options.db;
    }

    if ('schemas' in options && 'migrations' in options) {
        const mergedSchemas = { ...schemas, ...options.schemas };
        const mergedMigrations = { ...migrations, ...options.migrations };
        return new RIDB({dbName: options.dbName, schemas: mergedSchemas, migrations: mergedMigrations}) as RIDB<T>;
    }

    if ('dbName' in options) {
        return new RIDB({dbName: options.dbName, schemas, migrations}) as RIDB<T>;
    }

    throw new Error('Either db or dbName with optional schemas and migrations must be provided');
}

export const createStore = <T extends SchemaTypeRecord>(options: CreateStoreOptions<T> ):SDK.Pluto.Store => {
    const db = getDatabase(options);
    function isCollection(collectionName: string): collectionName is string & keyof typeof db.collections {
        return collectionName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() in db.collections;
    }

    const parseName = (collectionName: string) => {
        if (!isCollection(collectionName)) {
            throw new Error(`Collection ${String(collectionName)} does not exist`)
        }
        const name = collectionName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() as keyof typeof db.collections;
        return name;
    }
    return {
        async query(table: string, query?: any): Promise<any[]> {
            const collectionName = parseName(table);
            const collection = db.collections[collectionName];
            const ridbQuery = query?.selector || query || {};
            // @ts-ignore - Suppress complex union type error
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
                const hasCustomStart = 'start' in options;
                if (hasCustomStart) {
                    return options.start()
                } 
                const startOptions: { password?: string; storageType?: typeof BaseStorage | StorageType } = {};
                if ('password' in options && typeof options.password === 'string') {
                    startOptions.password = options.password;
                }
                if ('storageType' in options) {
                    startOptions.storageType = options.storageType;
                }
                if (Object.keys(startOptions).length > 0) {
                    return db.start(startOptions)
                } 
                return db.start()
            }
        },
        async stop() {
            await db.close()
        }
    }
}
