[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / DatabaseContext

# Variable: DatabaseContext

> `const` **DatabaseContext**: `Context`\<`undefined` \| \{ `createIssuanceFlow`: (`issuanceFlow`) => `Promise`\<`void`\>; `db`: [`RIDB`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb/classes/RIDB.md)\<\{ `credential-metadata`: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"dataJson"` \| `"name"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `name`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `credentials`: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"revoked"` \| `"dataJson"` \| `"issuer"` \| `"subject"` \| `"credentialCreated"` \| `"credentialUpdated"` \| `"credentialSchema"` \| `"validUntil"` \| `"id"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `credentialCreated`: \{ `type`: `"string"`; \}; `credentialSchema`: \{ `type`: `"string"`; \}; `credentialUpdated`: \{ `type`: `"string"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuer`: \{ `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `revoked`: \{ `type`: `"boolean"`; \}; `subject`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; `validUntil`: \{ `type`: `"number"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`; `did-link`: `Omit`\<\{ `encrypted`: (`"alias"` \| `"role"` \| `"hostId"` \| `"targetId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `hostId`: \{ `required`: `true`; `type`: `"string"`; \}; `role`: \{ `required`: `true`; `type`: `"number"`; \}; `targetId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `didkey-link`: `Omit`\<\{ `encrypted`: (`"alias"` \| `"didId"` \| `"keyId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `didId`: \{ `required`: `true`; `type`: `"string"`; \}; `keyId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `dids`: `Omit`\<\{ `encrypted`: (`"schema"` \| `"alias"` \| `"method"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `method`: \{ `required`: `true`; `type`: `"string"`; \}; `schema`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`; `issuance`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; `keys`: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"alias"` \| `"index"` \| `"rawHex"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `index`: \{ `type`: `"number"`; \}; `rawHex`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `messages`: `Omit`\<\{ `encrypted`: (`"dataJson"` \| `"id"` \| `"to"` \| `"createdTime"` \| `"thid"` \| `"piuri"` \| `"from"` \| `"isReceived"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `createdTime`: \{ `required`: `true`; `type`: `"number"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `from`: \{ `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `isReceived`: \{ `required`: `true`; `type`: `"number"`; \}; `piuri`: \{ `required`: `true`; `type`: `"string"`; \}; `thid`: \{ `type`: `"string"`; \}; `to`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`; `settings`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `id`: \{ `required`: `true`; `type`: `"string"`; \}; `key`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; \}\>; `deleteIssuanceFlow`: (`id`) => `Promise`\<`void`\>; `deleteMessage`: (`message`) => `Promise`\<`void`\>; `deleteSettingsByKey`: (`key`) => `Promise`\<`void`\>; `error`: `null` \| `Error`; `features`: `string`[]; `getExtendedDIDs`: () => `Promise`\<`object`[]\>; `getFeatures`: () => `Promise`\<`void`\>; `getGroupedDIDs`: () => `Promise`\<[`GroupedDIDs`](../type-aliases/GroupedDIDs.md)\>; `getIssuanceFlow`: (`id`) => `Promise`\<`null` \| `Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: ...; `type`: ...; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>\>; `getIssuanceFlows`: () => `Promise`\<`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: ...; `type`: ...; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>[]\>; `getMediator`: () => `Promise`\<`null` \| [`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>; `getMessages`: () => `Promise`\<`object`[]\>; `getResolverUrl`: () => `Promise`\<`null` \| `string`\>; `getSeed`: () => `Promise`\<`null` \| [`Seed`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>; `getSettingsByKey`: (`key`) => `Promise`\<`null` \| `string`\>; `getWallet`: () => `Promise`\<`null` \| `string`\>; `pluto`: [`Pluto`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md); `readMessage`: (`message`) => `Promise`\<`void`\>; `setMediator`: (`mediator`) => `Promise`\<`void`\>; `setResolverUrl`: (`resolverUrl`) => `Promise`\<`void`\>; `setSeed`: (`seed`) => `Promise`\<[`Seed`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>; `setWallet`: (`wallet`) => `Promise`\<`void`\>; `start`: (`options`) => `Promise`\<`void`\>; `state`: [`DatabaseState`](../type-aliases/DatabaseState.md); `storeDID`: (`did`, `keys`, `alias`) => `Promise`\<`void`\>; `storeSettingsByKey`: (`key`, `value`) => `Promise`\<`void`\>; `updateDIDStatus`: (`did`, `status`) => `Promise`\<`void`\>; `updateIssuanceFlow`: (`issuanceFlow`) => `Promise`\<`void`\>; `wallet`: `null` \| `string`; \}\>

Defined in: [packages/identus-react/src/context/index.ts:194](https://github.com/trust0-project/identus/blob/6480fffced88812f48e20542d3492e14ba5fb80e/packages/identus-react/src/context/index.ts#L194)

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
