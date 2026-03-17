[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / useDatabase

# Function: useDatabase()

> **useDatabase**(): `object`

Defined in: [packages/identus-react/src/hooks/useDatabase.ts:16](https://github.com/trust0-project/identus/blob/a9055153b7b08ad39900d9f5ee0efffa8bc04846/packages/identus-react/src/hooks/useDatabase.ts#L16)

Hook for accessing database context and operations.

Provides comprehensive database functionality including DID management, message handling,
credential storage, and application settings. This hook must be used within a DatabaseProvider.

## Returns

Database context

### createIssuanceFlow()

> **createIssuanceFlow**: (`issuanceFlow`) => `Promise`\<`void`\>

Create a new issuance flow

#### Parameters

##### issuanceFlow

`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: `true`; `type`: `"string"`; \}; `type`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>

#### Returns

`Promise`\<`void`\>

### db

> **db**: [`RIDB`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb/classes/RIDB.md)\<\{ `credential-metadata`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`CredentialMetadata`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `credentials`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"properties"`\> & `object`; `did-link`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`DIDLink`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `didkey-link`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`DIDKeyLink`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `dids`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"properties"`\> & `object`; `issuance`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: `true`; `type`: `"string"`; \}; `type`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; `keys`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`Key`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `messages`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`Message`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"properties"`\> & `object`; `settings`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `id`: \{ `required`: `true`; `type`: `"string"`; \}; `key`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; \}\>

RIDB database instance

### deleteCredential()

> **deleteCredential**: (`credential`) => `Promise`\<`void`\>

Delete a credential

#### Parameters

##### credential

[`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

#### Returns

`Promise`\<`void`\>

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

[`Message`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

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

> **error**: `Error` \| `null`

Current error, if any

### features

> **features**: `string`[]

Available database features

### getCredentials()

> **getCredentials**: () => `Promise`\<[`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]\>

Get all credentials

#### Returns

`Promise`\<[`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]\>

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

> **getGroupedDIDs**: () => `Promise`\<[`GroupedDIDs`](../type-aliases/GroupedDIDs.md)\>

Get DIDs grouped by status/type

#### Returns

`Promise`\<[`GroupedDIDs`](../type-aliases/GroupedDIDs.md)\>

### getIssuanceFlow()

> **getIssuanceFlow**: (`id`) => `Promise`\<`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\> \| `null`\>

Get a specific issuance flow by ID

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\> \| `null`\>

### getIssuanceFlows()

> **getIssuanceFlows**: () => `Promise`\<`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>[]\>

Get all issuance flows

#### Returns

`Promise`\<`Doc`\<\{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: ...; `type`: ...; \}; `type`: \{ `required`: ...; `type`: ...; \}; `value`: \{ `required`: ...; `type`: ...; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}\>[]\>

### getMediator()

> **getMediator**: () => `Promise`\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md) \| `null`\>

Get current mediator DID

#### Returns

`Promise`\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md) \| `null`\>

### getMessages()

> **getMessages**: () => `Promise`\<`object`[]\>

Retrieve all messages with read status

#### Returns

`Promise`\<`object`[]\>

### getResolverUrl()

> **getResolverUrl**: () => `Promise`\<`string` \| `null`\>

Get DID resolver URL

#### Returns

`Promise`\<`string` \| `null`\>

### getSeed()

> **getSeed**: () => `Promise`\<[`Seed`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md) \| `null`\>

Get wallet seed

#### Returns

`Promise`\<[`Seed`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md) \| `null`\>

### getSettingsByKey()

> **getSettingsByKey**: (`key`) => `Promise`\<`string` \| `null`\>

Get application setting by key

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `null`\>

### getWallet()

> **getWallet**: () => `Promise`\<`string` \| `null`\>

Get wallet identifier

#### Returns

`Promise`\<`string` \| `null`\>

### pluto

> **pluto**: [`Pluto`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Pluto storage instance

### readMessage()

> **readMessage**: (`message`) => `Promise`\<`void`\>

Mark a message as read

#### Parameters

##### message

[`Message`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

#### Returns

`Promise`\<`void`\>

### setMediator()

> **setMediator**: (`mediator`) => `Promise`\<`void`\>

Set mediator DID

#### Parameters

##### mediator

[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md) | `null`

#### Returns

`Promise`\<`void`\>

### setResolverUrl()

> **setResolverUrl**: (`resolverUrl`) => `Promise`\<`void`\>

Set DID resolver URL

#### Parameters

##### resolverUrl

`string` | `null`

#### Returns

`Promise`\<`void`\>

### setSeed()

> **setSeed**: (`seed`) => `Promise`\<[`Seed`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>

Set wallet seed

#### Parameters

##### seed

[`Seed`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

#### Returns

`Promise`\<[`Seed`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>

### setWallet()

> **setWallet**: (`wallet`) => `Promise`\<`void`\>

Set wallet identifier

#### Parameters

##### wallet

`string` | `null`

#### Returns

`Promise`\<`void`\>

### start()

> **start**: (`options`) => `Promise`\<`void`\>

Function to start/initialize the database

#### Parameters

##### options

`StartOptions`\<\{ `credential-metadata`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`CredentialMetadata`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `credentials`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"properties"`\> & `object`; `did-link`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`DIDLink`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `didkey-link`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`DIDKeyLink`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `dids`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"properties"`\> & `object`; `issuance`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `automaticIssuance`: \{ `type`: `"boolean"`; \}; `claims`: \{ `items`: \{ `properties`: \{ `name`: \{ `required`: `true`; `type`: `"string"`; \}; `type`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; \}; `type`: `"array"`; \}; `credentialFormat`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuingDID`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; `keys`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`Key`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"version"`\> & `object`; `messages`: `Omit`\<[`TypedSchema`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\<[`Message`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>, `"properties"`\> & `object`; `settings`: \{ `encrypted`: `string`[]; `primaryKey`: `string`; `properties`: \{ `id`: \{ `required`: `true`; `type`: `"string"`; \}; `key`: \{ `required`: `true`; `type`: `"string"`; \}; `value`: \{ `required`: `true`; `type`: `"string"`; \}; \}; `type`: `"object"`; `version`: `0`; \}; \}\>

#### Returns

`Promise`\<`void`\>

### state

> **state**: [`DatabaseState`](../type-aliases/DatabaseState.md)

Current database connection state

### storeDID()

> **storeDID**: (`did`, `keys`, `alias`) => `Promise`\<`void`\>

Store a DID with associated keys and alias

#### Parameters

##### did

[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

##### keys

[`PrivateKey`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]

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

[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

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

> **wallet**: `string` \| `null`

Current wallet identifier

## Throws

When used outside of DatabaseProvider
