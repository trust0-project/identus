[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / usePluto

# Function: usePluto()

> **usePluto**(`storageType`): `Pluto`

Defined in: [hooks/index.ts:165](https://github.com/trust0-project/identus/blob/94eb37ac3e348bfb235eefd303acf4a8e113137e/packages/identus-react/src/hooks/index.ts#L165)

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
