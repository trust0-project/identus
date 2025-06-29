[**Documentation v0.0.0**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [hooks](../README.md) / useDatabase

# Function: useDatabase()

> **useDatabase**(): `object`

Defined in: [hooks/index.ts:669](https://github.com/trust0-project/identus/blob/0e8c6d00246cbdbd7d213e9d5c311624e464003f/packages/identus-react/src/hooks/index.ts#L669)

Hook for accessing database context and operations.

Provides comprehensive database functionality including DID management, message handling,
credential storage, and application settings. This hook must be used within a DatabaseProvider.

## Returns

Database context containing extensive database operations and state management:
  - `db`: Database instance for direct operations
  - `state`: Current database state (loading, loaded, error, etc.)
  - `error`: Current error state if any database operations failed
  - `start`: Initialize database with configuration
  - `getExtendedDIDs`: Retrieve all stored DIDs with metadata
  - `storeDID`: Store a DID with optional metadata
  - `getMessages`: Retrieve all stored DIDComm messages
  - `getSeed`: Get the wallet seed for key derivation
  - `setSeed`: Store the wallet seed securely

### createIssuanceFlow()

> **createIssuanceFlow**: (`issuanceFlow`) => `Promise`\<`void`\>

Create a new issuance flow

#### Parameters

##### issuanceFlow

`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: `true`; `type`: `"string"`; \}; `type`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>

#### Returns

`Promise`\<`void`\>

### db

> **db**: `RIDB`\<\{ `credential-metadata`: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"dataJson"` \| `"name"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `name`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `credentials`: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"revoked"` \| `"dataJson"` \| `"issuer"` \| `"subject"` \| `"credentialCreated"` \| `"credentialUpdated"` \| `"credentialSchema"` \| `"validUntil"` \| `"id"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `credentialCreated`: \{ `type`: `"string"`; \}; `credentialSchema`: \{ `type`: `"string"`; \}; `credentialUpdated`: \{ `type`: `"string"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuer`: \{ `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `revoked`: \{ `type`: `"boolean"`; \}; `subject`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; `validUntil`: \{ `type`: `"number"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`; `did-link`: `Omit`\<\{ `encrypted`: (`"alias"` \| `"role"` \| `"hostId"` \| `"targetId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `hostId`: \{ `required`: `true`; `type`: `"string"`; \}; `role`: \{ `required`: `true`; `type`: `"number"`; \}; `targetId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `didkey-link`: `Omit`\<\{ `encrypted`: (`"alias"` \| `"didId"` \| `"keyId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `didId`: \{ `required`: `true`; `type`: `"string"`; \}; `keyId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `dids`: `Omit`\<\{ `encrypted`: (`"schema"` \| `"alias"` \| `"method"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `method`: \{ `required`: `true`; `type`: `"string"`; \}; `schema`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`; `issuance`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: `true`; `type`: `"string"`; \}; `type`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; `keys`: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"alias"` \| `"index"` \| `"rawHex"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `index`: \{ `type`: `"number"`; \}; `rawHex`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `messages`: `Omit`\<\{ `encrypted`: (`"dataJson"` \| `"id"` \| `"to"` \| `"createdTime"` \| `"thid"` \| `"piuri"` \| `"from"` \| `"isReceived"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `createdTime`: \{ `required`: `true`; `type`: `"number"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `from`: \{ `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `isReceived`: \{ `required`: `true`; `type`: `"number"`; \}; `piuri`: \{ `required`: `true`; `type`: `"string"`; \}; `thid`: \{ `type`: `"string"`; \}; `to`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`; `settings`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `id`: \{ `required`: `true`; `type`: `"string"`; \}; `key`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; \}\>

RIDB database instance

### deleteIssuanceFlow()

> **deleteIssuanceFlow**: (`id`) => `Promise`\<`void`\>

Delete an issuance flow

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`void`\>

### deleteMessage()

> **deleteMessage**: (`message`) => `Promise`\<`void`\>

Delete a message

#### Parameters

##### message

`Message`

#### Returns

`Promise`\<`void`\>

### deleteSettingsByKey()

> **deleteSettingsByKey**: (`key`) => `Promise`\<`void`\>

Delete application setting by key

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

### error

> **error**: `null` \| `Error`

Current error, if any

### features

> **features**: `string`[]

Available database features

### getExtendedDIDs()

> **getExtendedDIDs**: () => `Promise`\<`object`[]\>

Get all DIDs with extended metadata

#### Returns

`Promise`\<`object`[]\>

### getFeatures()

> **getFeatures**: () => `Promise`\<`void`\>

Load available database features

#### Returns

`Promise`\<`void`\>

### getGroupedDIDs()

> **getGroupedDIDs**: () => `Promise`\<[`GroupedDIDs`](../../context/type-aliases/GroupedDIDs.md)\>

Get DIDs grouped by status/type

#### Returns

`Promise`\<[`GroupedDIDs`](../../context/type-aliases/GroupedDIDs.md)\>

### getIssuanceFlow()

> **getIssuanceFlow**: (`id`) => `Promise`\<`null` \| `Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>\>

Get a specific issuance flow by ID

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`null` \| `Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>\>

### getIssuanceFlows()

> **getIssuanceFlows**: () => `Promise`\<`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>[]\>

Get all issuance flows

#### Returns

`Promise`\<`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>[]\>

### getMediator()

> **getMediator**: () => `Promise`\<`null` \| `DID`\>

Get current mediator DID

#### Returns

`Promise`\<`null` \| `DID`\>

### getMessages()

> **getMessages**: () => `Promise`\<`object`[]\>

Retrieve all messages with read status

#### Returns

`Promise`\<`object`[]\>

### getResolverUrl()

> **getResolverUrl**: () => `Promise`\<`null` \| `string`\>

Get DID resolver URL

#### Returns

`Promise`\<`null` \| `string`\>

### getSeed()

> **getSeed**: () => `Promise`\<`null` \| `Seed`\>

Get wallet seed

#### Returns

`Promise`\<`null` \| `Seed`\>

### getSettingsByKey()

> **getSettingsByKey**: (`key`) => `Promise`\<`null` \| `string`\>

Get application setting by key

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`null` \| `string`\>

### getWallet()

> **getWallet**: () => `Promise`\<`null` \| `string`\>

Get wallet identifier

#### Returns

`Promise`\<`null` \| `string`\>

### pluto

> **pluto**: `Pluto`

Pluto storage instance

### readMessage()

> **readMessage**: (`message`) => `Promise`\<`void`\>

Mark a message as read

#### Parameters

##### message

`Message`

#### Returns

`Promise`\<`void`\>

### setMediator()

> **setMediator**: (`mediator`) => `Promise`\<`void`\>

Set mediator DID

#### Parameters

##### mediator

`null` | `DID`

#### Returns

`Promise`\<`void`\>

### setResolverUrl()

> **setResolverUrl**: (`resolverUrl`) => `Promise`\<`void`\>

Set DID resolver URL

#### Parameters

##### resolverUrl

`null` | `string`

#### Returns

`Promise`\<`void`\>

### setSeed()

> **setSeed**: (`seed`) => `Promise`\<`Seed`\>

Set wallet seed

#### Parameters

##### seed

`Seed`

#### Returns

`Promise`\<`Seed`\>

### setWallet()

> **setWallet**: (`wallet`) => `Promise`\<`void`\>

Set wallet identifier

#### Parameters

##### wallet

`null` | `string`

#### Returns

`Promise`\<`void`\>

### start()

> **start**: (`options`) => `Promise`\<`void`\>

Function to start/initialize the database

#### Parameters

##### options

`StartOptions`\<\{ `credential-metadata`: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"dataJson"` \| `"name"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `name`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `credentials`: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"revoked"` \| `"dataJson"` \| `"issuer"` \| `"subject"` \| `"credentialCreated"` \| `"credentialUpdated"` \| `"credentialSchema"` \| `"validUntil"` \| `"id"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `credentialCreated`: \{ `type`: `"string"`; \}; `credentialSchema`: \{ `type`: `"string"`; \}; `credentialUpdated`: \{ `type`: `"string"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuer`: \{ `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `revoked`: \{ `type`: `"boolean"`; \}; `subject`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; `validUntil`: \{ `type`: `"number"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`; `did-link`: `Omit`\<\{ `encrypted`: (`"alias"` \| `"role"` \| `"hostId"` \| `"targetId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `hostId`: \{ `required`: `true`; `type`: `"string"`; \}; `role`: \{ `required`: `true`; `type`: `"number"`; \}; `targetId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `didkey-link`: `Omit`\<\{ `encrypted`: (`"alias"` \| `"didId"` \| `"keyId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `didId`: \{ `required`: `true`; `type`: `"string"`; \}; `keyId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `dids`: `Omit`\<\{ `encrypted`: (`"schema"` \| `"alias"` \| `"method"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `method`: \{ `required`: `true`; `type`: `"string"`; \}; `schema`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`; `issuance`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: `true`; `type`: `"string"`; \}; `type`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; `keys`: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"alias"` \| `"index"` \| `"rawHex"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `index`: \{ `type`: `"number"`; \}; `rawHex`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`; `messages`: `Omit`\<\{ `encrypted`: (`"dataJson"` \| `"id"` \| `"to"` \| `"createdTime"` \| `"thid"` \| `"piuri"` \| `"from"` \| `"isReceived"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `createdTime`: \{ `required`: `true`; `type`: `"number"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `from`: \{ `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `isReceived`: \{ `required`: `true`; `type`: `"number"`; \}; `piuri`: \{ `required`: `true`; `type`: `"string"`; \}; `thid`: \{ `type`: `"string"`; \}; `to`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`; `settings`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `id`: \{ `required`: `true`; `type`: `"string"`; \}; `key`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; \}\>

#### Returns

`Promise`\<`void`\>

### state

> **state**: [`DatabaseState`](../../context/type-aliases/DatabaseState.md)

Current database connection state

### storeDID()

> **storeDID**: (`did`, `keys`, `alias`) => `Promise`\<`void`\>

Store a DID with associated keys and alias

#### Parameters

##### did

`DID`

##### keys

`PrivateKey`[]

##### alias

`string`

#### Returns

`Promise`\<`void`\>

### storeSettingsByKey()

> **storeSettingsByKey**: (`key`, `value`) => `Promise`\<`void`\>

Store application setting by key

#### Parameters

##### key

`string`

##### value

`string`

#### Returns

`Promise`\<`void`\>

### updateDIDStatus()

> **updateDIDStatus**: (`did`, `status`) => `Promise`\<`void`\>

Update the status of a DID

#### Parameters

##### did

`DID`

##### status

`string`

#### Returns

`Promise`\<`void`\>

### updateIssuanceFlow()

> **updateIssuanceFlow**: (`issuanceFlow`) => `Promise`\<`void`\>

Update an existing issuance flow

#### Parameters

##### issuanceFlow

`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: `true`; `type`: `"string"`; \}; `type`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>

#### Returns

`Promise`\<`void`\>

### wallet

> **wallet**: `null` \| `string`

Current wallet identifier

## Throws

When used outside of DatabaseProvider
