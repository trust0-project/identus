[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [hooks](../README.md) / useCastor

# Function: useCastor()

> **useCastor**(`resolvers`): `Castor`

Defined in: [hooks/index.ts:93](https://github.com/trust0-project/identus/blob/3749e9a950934dc175049977b6cd44e590678417/packages/identus-react/src/hooks/index.ts#L93)

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
  
  const resolveDID = async () => {
    try {
      const didDocument = await castor.resolveDID(SDK.Domain.DID.fromString('did:prism:example'));
      console.log('Resolved DID:', didDocument.toString());
    } catch (error) {
      console.error('Failed to resolve DID:', error);
    }
  };
  
  return (
    <button onClick={resolveDID}>
      Resolve DID
    </button>
  );
}
```
