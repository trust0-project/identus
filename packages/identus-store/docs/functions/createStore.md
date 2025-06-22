[**@trust0/identus-store**](../README.md)

***

[@trust0/identus-store](../README.md) / createStore

# Function: createStore()

> **createStore**\<`T`\>(`options`): `Store`

Defined in: index.ts:43

Creates a store implementation for the Identus SDK Pluto interface.

## Type Parameters

### T

`T` *extends* `SchemaTypeRecord`

The schema type record that defines the database collections structure

## Parameters

### options

[`StoreTypes`](../type-aliases/StoreTypes.md)\<`T`\>

The configuration options for creating the store

## Returns

`Store`

A configured Pluto store instance that implements the SDK storage interface

## Throws

Throws an error if a referenced collection does not exist in the database

## Example

```typescript
import { createStore } from '@identus/store';
import { RIDB } from '@trust0/ridb';
import { InMemoryStorage } from '@trust0/ridb-core';

const db = new RIDB({ schema: mySchema });
const store = createStore({
  db,
  storageType: InMemoryStorage,
  password: 'optional-password'
});
```
