[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [db](../README.md) / migrations

# Variable: migrations

> `const` **migrations**: `object`

Defined in: [db/index.ts:152](https://github.com/trust0-project/identus/blob/6e116e70ebca69fb9f7ae79bf35341c428d9e5fd/packages/identus-react/src/db/index.ts#L152)

## Type declaration

### credential-metadata

> **credential-metadata**: `object`

#### Index Signature

\[`key`: `number`\]: `MigrationFunction`\<\{ `encrypted`: (`"recoveryId"` \| `"dataJson"` \| `"name"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `name`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}\>

### credentials

> **credentials**: `object`

#### Index Signature

\[`key`: `number`\]: `MigrationFunction`\<\{ `encrypted`: (`"recoveryId"` \| `"revoked"` \| `"dataJson"` \| `"issuer"` \| `"subject"` \| `"credentialCreated"` \| `"credentialUpdated"` \| `"credentialSchema"` \| `"validUntil"` \| `"id"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `credentialCreated`: \{ `type`: `"string"`; \}; `credentialSchema`: \{ `type`: `"string"`; \}; `credentialUpdated`: \{ `type`: `"string"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuer`: \{ `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `revoked`: \{ `type`: `"boolean"`; \}; `subject`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; `validUntil`: \{ `type`: `"number"`; \}; \}; `type`: `string`; `version`: `number`; \}\>

### did-link

> **did-link**: `object`

#### Index Signature

\[`key`: `number`\]: `MigrationFunction`\<\{ `encrypted`: (`"alias"` \| `"role"` \| `"hostId"` \| `"targetId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `hostId`: \{ `required`: `true`; `type`: `"string"`; \}; `role`: \{ `required`: `true`; `type`: `"number"`; \}; `targetId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}\>

### didkey-link

> **didkey-link**: `object`

#### Index Signature

\[`key`: `number`\]: `MigrationFunction`\<\{ `encrypted`: (`"alias"` \| `"didId"` \| `"keyId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `didId`: \{ `required`: `true`; `type`: `"string"`; \}; `keyId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}\>

### dids

> **dids**: `object`

#### Index Signature

\[`key`: `number`\]: `MigrationFunction`\<\{ `encrypted`: (`"schema"` \| `"alias"` \| `"method"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `method`: \{ `required`: `true`; `type`: `"string"`; \}; `schema`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}\>

### keys

> **keys**: `object`

#### Index Signature

\[`key`: `number`\]: `MigrationFunction`\<\{ `encrypted`: (`"recoveryId"` \| `"alias"` \| `"index"` \| `"rawHex"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `index`: \{ `type`: `"number"`; \}; `rawHex`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}\>

### messages

> **messages**: `object`

#### Index Signature

\[`key`: `number`\]: `MigrationFunction`\<\{ `encrypted`: (`"dataJson"` \| `"id"` \| `"to"` \| `"createdTime"` \| `"thid"` \| `"piuri"` \| `"from"` \| `"isReceived"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `createdTime`: \{ `required`: `true`; `type`: `"number"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `from`: \{ `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `isReceived`: \{ `required`: `true`; `type`: `"number"`; \}; `piuri`: \{ `required`: `true`; `type`: `"string"`; \}; `thid`: \{ `type`: `"string"`; \}; `to`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}\>
