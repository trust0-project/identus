[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / DIDAlias

# Type Alias: DIDAlias

> **DIDAlias** = `object`

Defined in: [packages/identus-react/src/context/index.ts:117](https://github.com/trust0-project/identus/blob/ff26890bfce71f2c24afaf0e6387df14285284cd/packages/identus-react/src/context/index.ts#L117)

Type definition for DID with extended metadata including alias and keys.

## Properties

### alias?

> `optional` **alias**: `string`

Defined in: [packages/identus-react/src/context/index.ts:121](https://github.com/trust0-project/identus/blob/ff26890bfce71f2c24afaf0e6387df14285284cd/packages/identus-react/src/context/index.ts#L121)

Optional human-readable alias for the DID

***

### did

> **did**: [`SDK.Domain.DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [packages/identus-react/src/context/index.ts:119](https://github.com/trust0-project/identus/blob/ff26890bfce71f2c24afaf0e6387df14285284cd/packages/identus-react/src/context/index.ts#L119)

The DID instance

***

### keys

> **keys**: [`SDK.Domain.PrivateKey`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]

Defined in: [packages/identus-react/src/context/index.ts:125](https://github.com/trust0-project/identus/blob/ff26890bfce71f2c24afaf0e6387df14285284cd/packages/identus-react/src/context/index.ts#L125)

Associated private keys for the DID

***

### status

> **status**: `string`

Defined in: [packages/identus-react/src/context/index.ts:123](https://github.com/trust0-project/identus/blob/ff26890bfce71f2c24afaf0e6387df14285284cd/packages/identus-react/src/context/index.ts#L123)

Current status of the DID (e.g., 'active', 'published', 'deactivated')
