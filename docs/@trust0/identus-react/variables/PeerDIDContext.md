[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / PeerDIDContext

# Variable: PeerDIDContext

> `const` **PeerDIDContext**: `Context`\<`undefined` \| \{ `create`: () => `Promise`\<[`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)\>; `peerDID`: `null` \| [`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md); \}\>

Defined in: [packages/identus-react/src/context/index.ts:107](https://github.com/trust0-project/identus/blob/d52c2d6f1f812ac5d63969b5246f00c579419b5b/packages/identus-react/src/context/index.ts#L107)

React context for managing Peer DID operations and state.

Peer DIDs are ephemeral, off-ledger identifiers used for direct peer-to-peer
communication. They can be created quickly without blockchain interaction
and are ideal for secure messaging between parties.

## Example

```tsx
import { PeerDIDContext } from '@trust0/identus-react/context';
import { useContext } from 'react';

function PeerDIDManager() {
  const context = useContext(PeerDIDContext);
  
  if (!context) {
    throw new Error('PeerDIDManager must be used within PeerDIDProvider');
  }
  
  const { peerDID, create } = context;
  
  const handleCreatePeerDID = async () => {
    await create();
  };
  
  return (
    <div>
      {peerDID ? (
        <div>
          <p>Peer DID: {peerDID.toString()}</p>
          <p>Ready for secure messaging</p>
        </div>
      ) : (
        <button onClick={handleCreatePeerDID}>Create Peer DID</button>
      )}
    </div>
  );
}
```
