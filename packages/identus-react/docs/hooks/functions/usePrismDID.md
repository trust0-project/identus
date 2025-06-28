[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [hooks](../README.md) / usePrismDID

# Function: usePrismDID()

> **usePrismDID**(): `object`

Defined in: [hooks/index.ts:141](https://github.com/trust0-project/identus/blob/6e116e70ebca69fb9f7ae79bf35341c428d9e5fd/packages/identus-react/src/hooks/index.ts#L141)

Hook for accessing Prism DID context and operations.

Prism DIDs are anchored on the Cardano blockchain and provide long-term, 
verifiable identity. This hook must be used within a PrismDIDProvider.

## Returns

Prism DID context containing:
  - `prismDID`: Current Prism DID instance or null if not created yet
  - `create`: Async function to create a new Prism DID with given alias

### create()

> **create**: (`alias`) => `Promise`\<`void`\>

Function to create a new Prism DID with an alias

#### Parameters

##### alias

`string`

#### Returns

`Promise`\<`void`\>

### prismDID

> **prismDID**: `null` \| `DID`

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
