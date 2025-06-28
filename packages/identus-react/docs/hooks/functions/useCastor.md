[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [hooks](../README.md) / useCastor

# Function: useCastor()

> **useCastor**(`resolvers`): `Castor`

Defined in: [hooks/index.ts:94](https://github.com/trust0-project/identus/blob/5b43368a7bb6070ac216d840cfd9b05d5b51c76b/packages/identus-react/src/hooks/index.ts#L94)

Creates and returns a memoized instance of Castor with optional additional resolvers.

Castor is the cryptographic component of the Identus SDK responsible for DID operations,
key management, and cryptographic functions. It can be extended with additional DID resolvers.

## Parameters

### resolvers

[`ExtraResolver`](../type-aliases/ExtraResolver.md)[] = `[]`

Array of additional DID resolver constructors to extend Castor functionality

## Returns

`Castor`

A memoized Castor instance with configured resolvers

## Example

```tsx
import { useCastor } from '@trust0/identus-react/hooks';

function DIDManager() {
  // Basic usage without additional resolvers
  const castor = useCastor();
  
  // Usage with custom resolvers
  const castorWithResolvers = useCastor([CustomResolver1, CustomResolver2]);
  
  const createDID = async () => {
    try {
      const privateKey = await castor.createPrivateKey();
      const did = await castor.createPrismDID(privateKey.publicKey());
      console.log('Created DID:', did.toString());
    } catch (error) {
      console.error('Failed to create DID:', error);
    }
  };
  
  return (
    <button onClick={createDID}>
      Create New DID
    </button>
  );
}
```
