[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [hooks](../README.md) / usePluto

# Function: usePluto()

> **usePluto**(`storageType`): `Pluto`

Defined in: [hooks/index.ts:159](https://github.com/trust0-project/identus/blob/b4ede682a782af9435b8aeff2f2edb2fc71c7d92/packages/identus-react/src/hooks/index.ts#L159)

Creates and returns a memoized Pluto instance for persistent storage operations.

Pluto is the storage layer of the Identus SDK that handles persistence of credentials,
DIDs, keys, and other identity-related data. It supports multiple storage backends.

## Parameters

### storageType

Storage backend to use (defaults to IndexedDB)

*typeof* `BaseStorage` | `StorageType`

## Returns

`Pluto`

A memoized Pluto instance configured with the specified storage
