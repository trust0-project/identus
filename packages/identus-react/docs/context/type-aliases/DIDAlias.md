[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [context](../README.md) / DIDAlias

# Type Alias: DIDAlias

> **DIDAlias** = `object`

Defined in: [context/index.ts:116](https://github.com/trust0-project/identus/blob/954e2761ec12ee676172e43e60153139e8242a10/packages/identus-react/src/context/index.ts#L116)

Type definition for DID with extended metadata including alias and keys.

## Properties

### alias?

> `optional` **alias**: `string`

Defined in: [context/index.ts:120](https://github.com/trust0-project/identus/blob/954e2761ec12ee676172e43e60153139e8242a10/packages/identus-react/src/context/index.ts#L120)

Optional human-readable alias for the DID

***

### did

> **did**: `SDK.Domain.DID`

Defined in: [context/index.ts:118](https://github.com/trust0-project/identus/blob/954e2761ec12ee676172e43e60153139e8242a10/packages/identus-react/src/context/index.ts#L118)

The DID instance

***

### keys

> **keys**: `SDK.Domain.PrivateKey`[]

Defined in: [context/index.ts:124](https://github.com/trust0-project/identus/blob/954e2761ec12ee676172e43e60153139e8242a10/packages/identus-react/src/context/index.ts#L124)

Associated private keys for the DID

***

### status

> **status**: `string`

Defined in: [context/index.ts:122](https://github.com/trust0-project/identus/blob/954e2761ec12ee676172e43e60153139e8242a10/packages/identus-react/src/context/index.ts#L122)

Current status of the DID (e.g., 'active', 'published', 'deactivated')
