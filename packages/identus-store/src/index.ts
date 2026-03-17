import {
    type RIDB,
    type StorageType
} from '@trust0/ridb';
import {
    Domain,
    Pluto,
    makeCollections
} from '@hyperledger/identus-sdk';
import {
    BaseStorage,
    SchemaTypeRecord,
} from '@trust0/ridb-core';

import {  extractMigrations, extractSchemas, migrateSchema } from './db';

type WithStart = { start: () => Promise<void> };
type WithOptions = { password: string, storageType: typeof BaseStorage | StorageType };
type StartOptions = WithStart | WithOptions;
type DatabaseOrOptionalSchemas<T extends import('@trust0/ridb-core').SchemaTypeRecord> = 
    { db?: RIDB<T> } | 
    { dbName: string, schemas?: T, migrations?: any };       


async function getDatabase<T extends SchemaTypeRecord>(
    options: DatabaseOrOptionalSchemas<T>
): Promise<RIDB<T>> {
    const collections = makeCollections();
    const { WasmInternal, RIDB } = await import('@trust0/ridb');
    const { SchemaFieldType} = await WasmInternal()
     const schemas = {
    ...extractSchemas(collections),
    credentials: migrateSchema(collections.credentials.schema, {
        status: {
            type: SchemaFieldType.string,
        }
    }),
    dids: migrateSchema(collections.dids.schema, {
        status: {
            type: SchemaFieldType.string,
        }
    }),
    messages: migrateSchema(collections.messages.schema, {
        read: {
            type: SchemaFieldType.boolean,
            default: false as const,
            required: true as const
        },
    }),
    settings: {
        version: 0 as const,
        primaryKey: 'id',
        type: SchemaFieldType.object,
        encrypted: ['value'],
        properties: {
            id: {
                type: SchemaFieldType.string,
                required: true as const
            },
            key: {
                type: SchemaFieldType.string,
                required: true as const
            },
            value: {
                type: SchemaFieldType.string,
                required: true as const
            }
        }
    },
    issuance: {
        version: 0 as const,
        primaryKey: 'id',
        type: SchemaFieldType.object,
        encrypted: ['claims'],
        properties: {
            id: {
                type: SchemaFieldType.string,
                required: true as const
            },
            claims: {
                type: SchemaFieldType.array,
                items: {
                    type: SchemaFieldType.object,
                    properties: {
                        name: {
                            type: SchemaFieldType.string,
                            required: true as const
                        },
                        value: {
                            type: SchemaFieldType.string,
                            required: true as const
                        },
                        type: {
                            type: SchemaFieldType.string,
                            required: true as const
                        },
                    }
                }
            },
            credentialFormat: {
                type: SchemaFieldType.string,
                required: true as const
            },
            automaticIssuance: {
                type: SchemaFieldType.boolean,
            },
            issuingDID: {
                type: SchemaFieldType.string,
                required: true as const
            }
        }
    },
}

 const migrations = extractMigrations(collections) as any

    if ('db' in options && options.db) {
        return Promise.resolve(
            options.db
        );
    }

    if ('schemas' in options && 'migrations' in options) {
        const mergedSchemas = { ...schemas, ...options.schemas };
        const mergedMigrations = { ...migrations, ...options.migrations };
        return Promise.resolve(
            new RIDB({dbName: options.dbName, schemas: mergedSchemas, migrations: mergedMigrations}) as RIDB<T>
        );
    }

    if ('dbName' in options) {
        return Promise.resolve(
            new RIDB({dbName: options.dbName, schemas, migrations}) as RIDB<T>
        )
    }

    throw new Error('Either db or dbName with optional schemas and migrations must be provided');
}



export const createStore = async <T extends SchemaTypeRecord>(options: DatabaseOrOptionalSchemas<T> & StartOptions ):Promise<Pluto.Store> => {
    const db = await getDatabase(options);
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
    return Promise.resolve(
        {
        async query(table: string, query?: any): Promise<any[]> {
            const collectionName = parseName(table);
            const collection = db.collections[collectionName];
            const ridbQuery = query?.selector || query || {};
            // @ts-ignore - Suppress complex union type error
            return collection.find(ridbQuery as any) as any
        },
        async insert(table: string, model: Domain.Pluto.Storable): Promise<void> {
            const collectionName = parseName(table);
            const collection = db.collections[collectionName]!
            await collection.create(model as any)
        },
        async update(table: string, model: Domain.Pluto.Storable): Promise<void> {
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
    )
}
