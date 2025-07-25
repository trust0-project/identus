[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / usePrismDID

# Function: usePrismDID()

> **usePrismDID**(): `object`

Defined in: [packages/identus-react/src/hooks/usePrismDID.ts:43](https://github.com/trust0-project/identus/blob/d52c2d6f1f812ac5d63969b5246f00c579419b5b/packages/identus-react/src/hooks/usePrismDID.ts#L43)

Hook for accessing Prism DID context and operations.

Prism DIDs are anchored on the Cardano blockchain and provide long-term, 
verifiable identity. This hook must be used within a PrismDIDProvider.

## Returns

Prism DID context

### create()

> **create**: (`alias`) => `Promise`\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>

Function to create a new Prism DID with an alias

#### Parameters

##### alias

`string`

#### Returns

`Promise`\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>

### isPublished()

> **isPublished**: (`did`) => `Promise`\<`boolean`\>

#### Parameters

##### did

[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

#### Returns

`Promise`\<`boolean`\>

### prismDID

> **prismDID**: `null` \| [`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Current Prism DID instance, null if not yet created

## Throws

When used outside of PrismDIDProvider

## Example

```tsx
import { usePrismDID } from '@trust0/identus-react/hooks';

function PrismDIDComponent() {
  const { prismDID, create } = usePrismDID();
  
  const handleCreateDID = async () => {
    try {
      await create('my-prism-identity');
      console.log('Prism DID created successfully');
    } catch (error) {
      console.error('Failed to create Prism DID:', error);
    }
  };
  
  return (
    <div>
      {prismDID ? (
        <p>Current Prism DID: {prismDID.toString()}</p>
      ) : (
        <button onClick={handleCreateDID}>Create Prism DID</button>
      )}
    </div>
  );
}
```
