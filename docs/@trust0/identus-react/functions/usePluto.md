[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / usePluto

# Function: usePluto()

> **usePluto**(`storageType`): [`Pluto`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [hooks/index.ts:165](https://github.com/trust0-project/identus/blob/eac5149d36d22802f0b2a6b3f6d5847d1bc57b57/packages/identus-react/src/hooks/index.ts#L165)

Creates and returns a memoized Pluto instance for persistent storage operations.

Pluto is the storage layer of the Identus SDK that handles persistence of credentials,
DIDs, keys, and other identity-related data. It supports multiple storage backends.

## Parameters

### storageType

Storage backend to use (defaults to IndexedDB)

*typeof* [`BaseStorage`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb-core/classes/BaseStorage.md) | [`StorageType`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb/enumerations/StorageType.md)

## Returns

[`Pluto`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

A memoized Pluto instance configured with the specified storage
