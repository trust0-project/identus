[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / useApollo

# Function: useApollo()

> **useApollo**(): [`Apollo`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [hooks/index.ts:49](https://github.com/trust0-project/identus/blob/eac5149d36d22802f0b2a6b3f6d5847d1bc57b57/packages/identus-react/src/hooks/index.ts#L49)

Creates and returns a memoized instance of Apollo DID resolver.

Apollo is the DID resolver component of the Identus SDK that handles resolving
Decentralized Identifiers (DIDs) to their corresponding DID Documents.

## Returns

[`Apollo`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

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
