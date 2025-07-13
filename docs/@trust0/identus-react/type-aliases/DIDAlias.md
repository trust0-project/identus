[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / DIDAlias

# Type Alias: DIDAlias

> **DIDAlias** = `object`

Defined in: [packages/identus-react/src/context/index.ts:124](https://github.com/trust0-project/identus/blob/c1cac9e36109f9f26d3017f9bb99381b85b534f1/packages/identus-react/src/context/index.ts#L124)

Type definition for DID with extended metadata including alias and keys.

## Properties

### alias?

> `optional` **alias**: `string`

Defined in: [packages/identus-react/src/context/index.ts:128](https://github.com/trust0-project/identus/blob/c1cac9e36109f9f26d3017f9bb99381b85b534f1/packages/identus-react/src/context/index.ts#L128)

Optional human-readable alias for the DID

***

### did

> **did**: [`SDK.Domain.DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [packages/identus-react/src/context/index.ts:126](https://github.com/trust0-project/identus/blob/c1cac9e36109f9f26d3017f9bb99381b85b534f1/packages/identus-react/src/context/index.ts#L126)

The DID instance

***

### keys

> **keys**: [`SDK.Domain.PrivateKey`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]

Defined in: [packages/identus-react/src/context/index.ts:132](https://github.com/trust0-project/identus/blob/c1cac9e36109f9f26d3017f9bb99381b85b534f1/packages/identus-react/src/context/index.ts#L132)

Associated private keys for the DID

***

### status

> **status**: `string`

Defined in: [packages/identus-react/src/context/index.ts:130](https://github.com/trust0-project/identus/blob/c1cac9e36109f9f26d3017f9bb99381b85b534f1/packages/identus-react/src/context/index.ts#L130)

Current status of the DID (e.g., 'active', 'published', 'deactivated')
