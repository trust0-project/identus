[**Documentation v0.0.0**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [hooks](../README.md) / useApollo

# Function: useApollo()

> **useApollo**(): `Apollo`

Defined in: [hooks/index.ts:43](https://github.com/trust0-project/identus/blob/0e8c6d00246cbdbd7d213e9d5c311624e464003f/packages/identus-react/src/hooks/index.ts#L43)

Creates and returns a memoized instance of Apollo DID resolver.

Apollo is the DID resolver component of the Identus SDK that handles resolving
Decentralized Identifiers (DIDs) to their corresponding DID Documents.

## Returns

`Apollo`

A memoized Apollo instance for DID resolution

## Example

```tsx
import { useApollo } from '@trust0/identus-react/hooks';

function DIDResolver() {
  const apollo = useApollo();
  
  const resolveDID = async (didString: string) => {
    try {
      const didDocument = await apollo.resolveDID(didString);
      console.log('Resolved DID Document:', didDocument);
    } catch (error) {
      console.error('Failed to resolve DID:', error);
    }
  };
  
  return (
    <button onClick={() => resolveDID('did:prism:example')}>
      Resolve DID
    </button>
  );
}
```
