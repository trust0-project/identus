<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/trust0-project/ridb@latest/docs/logo.svg" alt="JavaScript Database" />
  <br />
  <br />
  <h3 align="center">A secure light-weight and dependency free database wrapper for the web.</h3>
</p>

Trust0 is contributing to the [Hyperledger Identus community](https://github.com/hyperledger/identus) open source code by creating RIDB.
RIDB is a rust based, light weight wasm package for nodejs and browsers to build databases for the web.

## Hyperledger Identus
We extract the schemas, database structure and migrations paths of existing SDK in order to make sure everyone can transition from pluto-encrypted to this project with minimal changes.

### How to install the package

```bash
npm i @trust0/identus-store --save
```

or with yarn:

```bash
yarn add @trust0/identus-store
```

### Using in the typescript SDK

In order to use RIDBStore inside the [Hyperledger Identus TS SDK](https://github.com/input-output-hk/atala-prism-wallet-sdk-ts) you just need to initialise the Store before passing it to the Pluto constructor.

```typescript
import SDK from '@hyperledger/identus-edge-agent-sdk';
import {RIDBStore} from '@trust0/identus-store'
const apollo = new SDK.Apollo();
const store = new RIDBStore({
    dbName: YOUR_DATABASE_NAME
})
const defaultSeed = apollo.createRandomSeed().seed // 
const castor = new SDK.Castor(apollo)
const agent = await SDK.Agent.initialize({
    apollo,
    castor,
    mediatorDID,
    pluto: new SDK.Pluto(store, apollo),
    seed: defaultSeed
});
```

### Documentation
Here's the main compliant SDK.Pluto.Store interface implementation

```typescript
import { BaseStorage, QueryType, SchemaType, StorageType } from '@trust0/ridb';
import SDK from '@hyperledger/identus-edge-agent-sdk';
export declare class RIDBStore implements SDK.Pluto.Store {
    private options;
    private _db;
    private extractCollections;
    constructor(options: {
        dbName: string;
        storageType?: typeof BaseStorage  | StorageType;
        password?: string;
    });
    private parseName;
    query(table: string, query?: QueryType<any>): Promise<any[]>;
    insert<T extends SDK.Domain.Pluto.Storable>(table: string, model: T): Promise<void>;
    update<T extends SDK.Domain.Pluto.Storable>(table: string, model: T): Promise<void>;
    delete(table: string, uuid: string): Promise<void>;
    get collections(): {
        [x: string]: import("@trust0/ridb").Collection<import("@trust0/ridb").Schema<SchemaType>>;
    };
    start(): Promise<void>;
    cleanup(): Promise<void>;
    clear(): Promise<void>;
}
```

### How to enable storage encryption?
Add a password attribute to the constructor

```typescript 
import {RIDBStore} from '@trust0/identus-store'
const apollo = new SDK.Apollo();
const store = new RIDBStore({
    dbName: YOUR_DATABASE_NAME,
    password: 'my local db password'
})
```

### How to use a different store?
There's currently 2 available storages, inMemory and indexDB

#### InMemory
Works in any environment (browser and node) and support all available plugins, Migration and Encryption.

Using InMemory:

```typescript 
import {RIDBStore} from '@trust0/identus-store'
const apollo = new SDK.Apollo();
const store = new RIDBStore({
    dbName: YOUR_DATABASE_NAME,
    storageType: StorageType.InMemory
})
```

#### IndexDB
Works only in Browser environments as our lightweight implementation is using the browser API's directly and also supports all available plugins, Migration and Encryption.

Using IndexDB:

```typescript 
import {RIDBStore} from '@trust0/identus-store'
const apollo = new SDK.Apollo();
const store = new RIDBStore({
    dbName: YOUR_DATABASE_NAME,
    storageType: StorageType.IndexDB
})
```

#### How do I plug my own storage?
In order to create your own storage, compatible with Identus and RIDB you must follow this interface and implement the code choosing the storage of your choice.

Using your own storage:

```typescript 
import {RIDBStore} from '@trust0/identus-store'
export class MyOwnStorage<T extends SchemaTypeRecord>  extends BaseStorage<T> {

    static create<SchemasCreate extends SchemaTypeRecord>(
        name: string,
        schemas: SchemasCreate,
        options: any
    ): Promise<
        BaseStorage<
            SchemasCreate
        >
    > {
        throw new Error("Method not implemented.");
    }

    constructor(name: string, schemas: T, options: any) {
        super(name, schemas, options);
    }

    findDocumentById(collectionName: keyof T, id: string): Promise<Doc<T[keyof T]> | null> {
        throw new Error("Method not implemented.");
    }
    find(collectionName: keyof T, query: QueryType<T[keyof T]>): Promise<Doc<T[keyof T]>[]> {
        throw new Error("Method not implemented.");
    }
    write(op: Operation<T[keyof T]>): Promise<Doc<T[keyof T]>> {
        throw new Error("Method not implemented.");
    }
    count(collectionName: keyof T, query: QueryType<T[keyof T]>): Promise<number> {
        throw new Error("Method not implemented.");
    }
    start(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    close(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
const apollo = new SDK.Apollo();
const store = new RIDBStore({
    dbName: YOUR_DATABASE_NAME,
    storageType: MyOwnStorage
})
```