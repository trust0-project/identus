[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / DIDAlias

# Type Alias: DIDAlias

> **DIDAlias** = `object`

Defined in: [packages/identus-react/src/context/index.ts:123](https://github.com/trust0-project/identus/blob/9b30acee0203d83a86724ca89290e3482f790a0d/packages/identus-react/src/context/index.ts#L123)

Type definition for DID with extended metadata including alias and keys.

## Properties

### alias?

> `optional` **alias**: `string`

Defined in: [packages/identus-react/src/context/index.ts:127](https://github.com/trust0-project/identus/blob/9b30acee0203d83a86724ca89290e3482f790a0d/packages/identus-react/src/context/index.ts#L127)

Optional human-readable alias for the DID

***

### did

> **did**: [`SDK.Domain.DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [packages/identus-react/src/context/index.ts:125](https://github.com/trust0-project/identus/blob/9b30acee0203d83a86724ca89290e3482f790a0d/packages/identus-react/src/context/index.ts#L125)

The DID instance

***

### keys

> **keys**: [`SDK.Domain.PrivateKey`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]

Defined in: [packages/identus-react/src/context/index.ts:131](https://github.com/trust0-project/identus/blob/9b30acee0203d83a86724ca89290e3482f790a0d/packages/identus-react/src/context/index.ts#L131)

Associated private keys for the DID

***

### status

> **status**: `string`

Defined in: [packages/identus-react/src/context/index.ts:129](https://github.com/trust0-project/identus/blob/9b30acee0203d83a86724ca89290e3482f790a0d/packages/identus-react/src/context/index.ts#L129)

Current status of the DID (e.g., 'active', 'published', 'deactivated')
