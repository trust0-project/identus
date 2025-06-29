[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / usePrismDID

# Function: usePrismDID()

> **usePrismDID**(): `object`

Defined in: [hooks/index.ts:147](https://github.com/trust0-project/identus/blob/8a58c4c511d6150caafecc2e17057355cee108a6/packages/identus-react/src/hooks/index.ts#L147)

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
