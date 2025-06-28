[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [db](../README.md) / schemas

# Variable: schemas

> `const` **schemas**: `object`

Defined in: [db/index.ts:68](https://github.com/trust0-project/identus/blob/5b43368a7bb6070ac216d840cfd9b05d5b51c76b/packages/identus-react/src/db/index.ts#L68)

## Type declaration

### credential-metadata

> **credential-metadata**: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"dataJson"` \| `"name"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `name`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`

#### Type declaration

##### version

> **version**: `0`

### credentials

> **credentials**: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"revoked"` \| `"dataJson"` \| `"issuer"` \| `"subject"` \| `"credentialCreated"` \| `"credentialUpdated"` \| `"credentialSchema"` \| `"validUntil"` \| `"id"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `credentialCreated`: \{ `type`: `"string"`; \}; `credentialSchema`: \{ `type`: `"string"`; \}; `credentialUpdated`: \{ `type`: `"string"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `issuer`: \{ `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `revoked`: \{ `type`: `"boolean"`; \}; `subject`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; `validUntil`: \{ `type`: `"number"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`

#### Type declaration

##### encrypted

> **encrypted**: (`"recoveryId"` \| `"revoked"` \| `"dataJson"` \| `"issuer"` \| `"subject"` \| `"credentialCreated"` \| `"credentialUpdated"` \| `"credentialSchema"` \| `"validUntil"` \| `"id"`)[] \| `never`[]

##### properties

> **properties**: `object` & `object`

###### Type declaration

###### credentialCreated

> **credentialCreated**: `object`

###### credentialCreated.type

> **type**: `"string"`

###### credentialSchema

> **credentialSchema**: `object`

###### credentialSchema.type

> **type**: `"string"`

###### credentialUpdated

> **credentialUpdated**: `object`

###### credentialUpdated.type

> **type**: `"string"`

###### dataJson

> **dataJson**: `object`

###### dataJson.required

> **required**: `true`

###### dataJson.type

> **type**: `"string"`

###### id

> **id**: `object`

###### id.required

> **required**: `true`

###### id.type

> **type**: `"string"`

###### issuer

> **issuer**: `object`

###### issuer.type

> **type**: `"string"`

###### recoveryId

> **recoveryId**: `object`

###### recoveryId.required

> **required**: `true`

###### recoveryId.type

> **type**: `"string"`

###### revoked

> **revoked**: `object`

###### revoked.type

> **type**: `"boolean"`

###### subject

> **subject**: `object`

###### subject.type

> **type**: `"string"`

###### uuid

> **uuid**: `object`

###### uuid.maxLength

> **maxLength**: `60`

###### uuid.required

> **required**: `true`

###### uuid.type

> **type**: `"string"`

###### validUntil

> **validUntil**: `object`

###### validUntil.type

> **type**: `"number"`

###### Type declaration

###### status

> **status**: `object`

###### status.type

> **type**: `"string"` = `SchemaFieldType.string`

##### version

> **version**: `0`

### did-link

> **did-link**: `Omit`\<\{ `encrypted`: (`"alias"` \| `"role"` \| `"hostId"` \| `"targetId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `hostId`: \{ `required`: `true`; `type`: `"string"`; \}; `role`: \{ `required`: `true`; `type`: `"number"`; \}; `targetId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`

#### Type declaration

##### version

> **version**: `0`

### didkey-link

> **didkey-link**: `Omit`\<\{ `encrypted`: (`"alias"` \| `"didId"` \| `"keyId"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `didId`: \{ `required`: `true`; `type`: `"string"`; \}; `keyId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`

#### Type declaration

##### version

> **version**: `0`

### dids

> **dids**: `Omit`\<\{ `encrypted`: (`"schema"` \| `"alias"` \| `"method"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `method`: \{ `required`: `true`; `type`: `"string"`; \}; `schema`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`

#### Type declaration

##### encrypted

> **encrypted**: (`"schema"` \| `"alias"` \| `"method"`)[] \| `never`[]

##### properties

> **properties**: `object` & `object`

###### Type declaration

###### alias

> **alias**: `object`

###### alias.type

> **type**: `"string"`

###### method

> **method**: `object`

###### method.required

> **required**: `true`

###### method.type

> **type**: `"string"`

###### schema

> **schema**: `object`

###### schema.required

> **required**: `true`

###### schema.type

> **type**: `"string"`

###### uuid

> **uuid**: `object`

###### uuid.maxLength

> **maxLength**: `60`

###### uuid.required

> **required**: `true`

###### uuid.type

> **type**: `"string"`

###### Type declaration

###### status

> **status**: `object`

###### status.type

> **type**: `"string"` = `SchemaFieldType.string`

##### version

> **version**: `0`

### issuance

> **issuance**: `object`

#### issuance.encrypted

> **encrypted**: `string`[]

#### issuance.primaryKey

> **primaryKey**: `string` = `'id'`

#### issuance.properties

> **properties**: `object`

#### issuance.properties.automaticIssuance

> **automaticIssuance**: `object`

#### issuance.properties.automaticIssuance.type

> **type**: `"boolean"` = `SchemaFieldType.boolean`

#### issuance.properties.claims

> **claims**: `object`

#### issuance.properties.claims.items

> **items**: `object`

#### issuance.properties.claims.items.properties

> **properties**: `object`

#### issuance.properties.claims.items.properties.name

> **name**: `object`

#### issuance.properties.claims.items.properties.name.required

> **required**: `true`

#### issuance.properties.claims.items.properties.name.type

> **type**: `"string"` = `SchemaFieldType.string`

#### issuance.properties.claims.items.properties.type

> **type**: `object`

#### issuance.properties.claims.items.properties.type.required

> **required**: `true`

#### issuance.properties.claims.items.properties.type.type

> **type**: `"string"` = `SchemaFieldType.string`

#### issuance.properties.claims.items.properties.value

> **value**: `object`

#### issuance.properties.claims.items.properties.value.required

> **required**: `true`

#### issuance.properties.claims.items.properties.value.type

> **type**: `"string"` = `SchemaFieldType.string`

#### issuance.properties.claims.items.type

> **type**: `"object"` = `SchemaFieldType.object`

#### issuance.properties.claims.type

> **type**: `"array"` = `SchemaFieldType.array`

#### issuance.properties.credentialFormat

> **credentialFormat**: `object`

#### issuance.properties.credentialFormat.required

> **required**: `true`

#### issuance.properties.credentialFormat.type

> **type**: `"string"` = `SchemaFieldType.string`

#### issuance.properties.id

> **id**: `object`

#### issuance.properties.id.required

> **required**: `true`

#### issuance.properties.id.type

> **type**: `"string"` = `SchemaFieldType.string`

#### issuance.properties.issuingDID

> **issuingDID**: `object`

#### issuance.properties.issuingDID.required

> **required**: `true`

#### issuance.properties.issuingDID.type

> **type**: `"string"` = `SchemaFieldType.string`

#### issuance.type

> **type**: `"object"` = `SchemaFieldType.object`

#### issuance.version

> **version**: `0`

### keys

> **keys**: `Omit`\<\{ `encrypted`: (`"recoveryId"` \| `"alias"` \| `"index"` \| `"rawHex"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `alias`: \{ `type`: `"string"`; \}; `index`: \{ `type`: `"number"`; \}; `rawHex`: \{ `required`: `true`; `type`: `"string"`; \}; `recoveryId`: \{ `required`: `true`; `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"version"`\> & `object`

#### Type declaration

##### version

> **version**: `0`

### messages

> **messages**: `Omit`\<\{ `encrypted`: (`"dataJson"` \| `"id"` \| `"to"` \| `"createdTime"` \| `"thid"` \| `"piuri"` \| `"from"` \| `"isReceived"`)[]; `indexes?`: `string`[]; `primaryKey`: `string`; `properties`: \{ `createdTime`: \{ `required`: `true`; `type`: `"number"`; \}; `dataJson`: \{ `required`: `true`; `type`: `"string"`; \}; `from`: \{ `type`: `"string"`; \}; `id`: \{ `required`: `true`; `type`: `"string"`; \}; `isReceived`: \{ `required`: `true`; `type`: `"number"`; \}; `piuri`: \{ `required`: `true`; `type`: `"string"`; \}; `thid`: \{ `type`: `"string"`; \}; `to`: \{ `type`: `"string"`; \}; `uuid`: \{ `maxLength`: `60`; `required`: `true`; `type`: `"string"`; \}; \}; `type`: `string`; `version`: `number`; \}, `"properties"`\> & `object`

#### Type declaration

##### encrypted

> **encrypted**: (`"dataJson"` \| `"id"` \| `"to"` \| `"createdTime"` \| `"thid"` \| `"piuri"` \| `"from"` \| `"isReceived"`)[] \| `never`[]

##### properties

> **properties**: `object` & `object`

###### Type declaration

###### createdTime

> **createdTime**: `object`

###### createdTime.required

> **required**: `true`

###### createdTime.type

> **type**: `"number"`

###### dataJson

> **dataJson**: `object`

###### dataJson.required

> **required**: `true`

###### dataJson.type

> **type**: `"string"`

###### from

> **from**: `object`

###### from.type

> **type**: `"string"`

###### id

> **id**: `object`

###### id.required

> **required**: `true`

###### id.type

> **type**: `"string"`

###### isReceived

> **isReceived**: `object`

###### isReceived.required

> **required**: `true`

###### isReceived.type

> **type**: `"number"`

###### piuri

> **piuri**: `object`

###### piuri.required

> **required**: `true`

###### piuri.type

> **type**: `"string"`

###### thid

> **thid**: `object`

###### thid.type

> **type**: `"string"`

###### to

> **to**: `object`

###### to.type

> **type**: `"string"`

###### uuid

> **uuid**: `object`

###### uuid.maxLength

> **maxLength**: `60`

###### uuid.required

> **required**: `true`

###### uuid.type

> **type**: `"string"`

###### Type declaration

###### read

> **read**: `object`

###### read.default

> **default**: `false`

###### read.required

> **required**: `true`

###### read.type

> **type**: `"boolean"` = `SchemaFieldType.boolean`

##### version

> **version**: `0`

### settings

> **settings**: `object`

#### settings.encrypted

> **encrypted**: `string`[]

#### settings.primaryKey

> **primaryKey**: `string` = `'id'`

#### settings.properties

> **properties**: `object`

#### settings.properties.id

> **id**: `object`

#### settings.properties.id.required

> **required**: `true`

#### settings.properties.id.type

> **type**: `"string"` = `SchemaFieldType.string`

#### settings.properties.key

> **key**: `object`

#### settings.properties.key.required

> **required**: `true`

#### settings.properties.key.type

> **type**: `"string"` = `SchemaFieldType.string`

#### settings.properties.value

> **value**: `object`

#### settings.properties.value.required

> **required**: `true`

#### settings.properties.value.type

> **type**: `"string"` = `SchemaFieldType.string`

#### settings.type

> **type**: `"object"` = `SchemaFieldType.object`

#### settings.version

> **version**: `0`
