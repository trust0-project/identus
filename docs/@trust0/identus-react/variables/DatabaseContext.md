[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / DatabaseContext

# Variable: DatabaseContext

> `const` **DatabaseContext**: `Context`\<`undefined` \| \{ `createIssuanceFlow`: (`issuanceFlow`) => `Promise`\<`void`\>; `db`: [`RIDB`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb/classes/RIDB.md)\<\{ `credential-metadata`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`CredentialMetadata`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `credentials`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"properties"`\> & `object`; `did-link`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`DIDLink`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `didkey-link`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`DIDKeyLink`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `dids`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"properties"`\> & `object`; `issuance`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; `keys`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`Key`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `messages`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`Message`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"properties"`\> & `object`; `settings`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `id`: \{ `required`: `true`; `type`: `"string"`; \}; `key`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; \}\>; `deleteCredential`: (`credential`) => `Promise`\<`void`\>; `deleteIssuanceFlow`: (`id`) => `Promise`\<`void`\>; `deleteMessage`: (`message`) => `Promise`\<`void`\>; `deleteSettingsByKey`: (`key`) => `Promise`\<`void`\>; `error`: `null` \| `Error`; `features`: `string`[]; `getCredentials`: () => `Promise`\<[`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]\>; `getExtendedDIDs`: () => `Promise`\<`object`[]\>; `getFeatures`: () => `Promise`\<`void`\>; `getGroupedDIDs`: () => `Promise`\<[`GroupedDIDs`](../type-aliases/GroupedDIDs.md)\>; `getIssuanceFlow`: (`id`) => `Promise`\<`null` \| `Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: ...; `type`: ...; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>\>; `getIssuanceFlows`: () => `Promise`\<`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: ...; `type`: ...; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>[]\>; `getMediator`: () => `Promise`\<`null` \| [`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>; `getMessages`: () => `Promise`\<`object`[]\>; `getResolverUrl`: () => `Promise`\<`null` \| `string`\>; `getSeed`: () => `Promise`\<`null` \| [`Seed`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>; `getSettingsByKey`: (`key`) => `Promise`\<`null` \| `string`\>; `getWallet`: () => `Promise`\<`null` \| `string`\>; `pluto`: [`Pluto`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md); `readMessage`: (`message`) => `Promise`\<`void`\>; `setMediator`: (`mediator`) => `Promise`\<`void`\>; `setResolverUrl`: (`resolverUrl`) => `Promise`\<`void`\>; `setSeed`: (`seed`) => `Promise`\<[`Seed`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>; `setWallet`: (`wallet`) => `Promise`\<`void`\>; `start`: (`options`) => `Promise`\<`void`\>; `state`: [`DatabaseState`](../type-aliases/DatabaseState.md); `storeDID`: (`did`, `keys`, `alias`) => `Promise`\<`void`\>; `storeSettingsByKey`: (`key`, `value`) => `Promise`\<`void`\>; `updateDIDStatus`: (`did`, `status`) => `Promise`\<`void`\>; `updateIssuanceFlow`: (`issuanceFlow`) => `Promise`\<`void`\>; `wallet`: `null` \| `string`; \}\>

Defined in: [packages/identus-react/src/context/index.ts:201](https://github.com/trust0-project/identus/blob/af1ab4bdd5f7f0307875bb89685db199453ac4d5/packages/identus-react/src/context/index.ts#L201)

React context for comprehensive database operations and state management.

This context provides access to all database-related functionality including
DID management, message handling, credential storage, issuance flows, and
application settings. It serves as the central data layer for the identity wallet.

## Example

```tsx
import { DatabaseContext } from '@trust0/identus-react/context';
import { useContext } from 'react';
import { StorageType } from '@trust0/ridb';

function DatabaseManager() {
  const context = useContext(DatabaseContext);
  
  if (!context) {
    throw new Error('DatabaseManager must be used within DatabaseProvider');
  }
  
  const { db, state, start, getExtendedDIDs, getSeed } = context;
  
  const initializeDatabase = async () => {
    await start({
      name: 'my-wallet',
      storageType: StorageType.IndexDB,
      schemas: schemas
    });
  };
  
  const loadWalletData = async () => {
    const dids = await getExtendedDIDs();
    const seed = await getSeed();
    console.log('DIDs:', dids.length, 'Seed exists:', !!seed);
  };
  
  return (
    <div>
      <p>Database State: {state}</p>
      <button onClick={initializeDatabase}>Initialize</button>
      <button onClick={loadWalletData}>Load Data</button>
    </div>
  );
}
```
