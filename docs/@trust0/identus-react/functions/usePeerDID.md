[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / usePeerDID

# Function: usePeerDID()

> **usePeerDID**(): `object`

Defined in: [packages/identus-react/src/hooks/usePeerDID.ts:49](https://github.com/trust0-project/identus/blob/9f7666f79544e124604ebfe5ab0b08403f9e8849/packages/identus-react/src/hooks/usePeerDID.ts#L49)

Hook for accessing Peer DID context and operations.

Peer DIDs are ephemeral, off-ledger DIDs used for direct peer-to-peer communication.
They're created quickly and don't require blockchain anchoring. This hook must be used
within a PeerDIDProvider.

## Returns

Peer DID context

### create()

> **create**: () => `Promise`\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>

Function to create a new Peer DID

#### Returns

`Promise`\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>

### peerDID

> **peerDID**: `null` \| [`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Current Peer DID instance, null if not yet created

## Throws

When used outside of PeerDIDProvider

## Example

```tsx
import { usePeerDID } from '@trust0/identus-react/hooks';

function PeerDIDComponent() {
  const { peerDID, create } = usePeerDID();
  
  const handleCreatePeerDID = async () => {
    try {
      await create();
      console.log('Peer DID created for communication');
    } catch (error) {
      console.error('Failed to create Peer DID:', error);
    }
  };
  
  return (
    <div>
      {peerDID ? (
        <div>
          <p>Peer DID: {peerDID.toString()}</p>
          <p>Ready for peer-to-peer communication</p>
        </div>
      ) : (
        <button onClick={handleCreatePeerDID}>
          Create Peer DID
        </button>
      )}
    </div>
  );
}
```
