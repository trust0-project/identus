[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / usePluto

# Function: usePluto()

> **usePluto**(`storageType`): [`Pluto`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [packages/identus-react/src/hooks/usePluto.ts:20](https://github.com/trust0-project/identus/blob/4f0e7be790f57d58e6788f04401f69112e86727e/packages/identus-react/src/hooks/usePluto.ts#L20)

Creates and returns a memoized Pluto instance for persistent storage operations.

Pluto is the storage layer of the Identus SDK that handles persistence of credentials,
DIDs, keys, and other identity-related data. It supports multiple storage backends.

## Parameters

### storageType

Storage backend to use (defaults to IndexedDB)

*typeof* [`BaseStorage`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb-core/classes/BaseStorage.md) | [`StorageType`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb/enumerations/StorageType.md)

## Returns

[`Pluto`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Pluto Context
