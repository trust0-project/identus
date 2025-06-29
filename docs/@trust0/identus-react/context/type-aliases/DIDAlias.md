[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [context](../README.md) / DIDAlias

# Type Alias: DIDAlias

> **DIDAlias** = `object`

Defined in: [context/index.ts:110](https://github.com/trust0-project/identus/blob/94eb37ac3e348bfb235eefd303acf4a8e113137e/packages/identus-react/src/context/index.ts#L110)

Type definition for DID with extended metadata including alias and keys.

## Properties

### alias?

> `optional` **alias**: `string`

Defined in: [context/index.ts:114](https://github.com/trust0-project/identus/blob/94eb37ac3e348bfb235eefd303acf4a8e113137e/packages/identus-react/src/context/index.ts#L114)

Optional human-readable alias for the DID

***

### did

> **did**: `SDK.Domain.DID`

Defined in: [context/index.ts:112](https://github.com/trust0-project/identus/blob/94eb37ac3e348bfb235eefd303acf4a8e113137e/packages/identus-react/src/context/index.ts#L112)

The DID instance

***

### keys

> **keys**: `SDK.Domain.PrivateKey`[]

Defined in: [context/index.ts:118](https://github.com/trust0-project/identus/blob/94eb37ac3e348bfb235eefd303acf4a8e113137e/packages/identus-react/src/context/index.ts#L118)

Associated private keys for the DID

***

### status

> **status**: `string`

Defined in: [context/index.ts:116](https://github.com/trust0-project/identus/blob/94eb37ac3e348bfb235eefd303acf4a8e113137e/packages/identus-react/src/context/index.ts#L116)

Current status of the DID (e.g., 'active', 'published', 'deactivated')
