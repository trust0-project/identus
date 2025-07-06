[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-store](../README.md) / createStore

# Function: createStore()

> **createStore**\<`T`\>(`options`): [`Store`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [index.ts:13](https://github.com/trust0-project/identus/blob/a6d496dbeb1ff4b1fd951df4078dd7dccd84e094/packages/identus-store/src/index.ts#L13)

## Type Parameters

### T

`T` *extends* [`SchemaTypeRecord`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb-core/type-aliases/SchemaTypeRecord.md)

## Parameters

### options

#### db

[`RIDB`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb/classes/RIDB.md)\<`T`\>

#### password?

`string`

#### storageType?

*typeof* [`BaseStorage`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb-core/classes/BaseStorage.md) \| [`StorageType`](https://github.com/trust0-project/RIDB/blob/main/docs/%40trust0/ridb/enumerations/StorageType.md)

## Returns

[`Store`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)
