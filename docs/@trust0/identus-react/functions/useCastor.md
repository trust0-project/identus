[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / useCastor

# Function: useCastor()

> **useCastor**(`resolvers`): [`Castor`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [packages/identus-react/src/hooks/useCastor.ts:45](https://github.com/trust0-project/identus/blob/bd9b053affe13e08b28b5939844104e9cc829449/packages/identus-react/src/hooks/useCastor.ts#L45)

Creates and returns a memoized instance of Castor with optional additional resolvers.

Castor is the cryptographic component of the Identus SDK responsible for DID operations,
key management, and cryptographic functions. It can be extended with additional DID resolvers.

## Parameters

### resolvers

[`ExtraResolver`](../type-aliases/ExtraResolver.md)[] = `[]`

Optional array of additional DID resolver constructors to extend Castor functionality

## Returns

[`Castor`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Castor Context

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
