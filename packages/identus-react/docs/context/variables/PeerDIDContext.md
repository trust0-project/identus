[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [context](../README.md) / PeerDIDContext

# Variable: PeerDIDContext

> `const` **PeerDIDContext**: `Context`\<`undefined` \| \{ `create`: () => `Promise`\<`void`\>; `peerDID`: `null` \| `DID`; \}\>

Defined in: [context/index.ts:97](https://github.com/trust0-project/identus/blob/6e116e70ebca69fb9f7ae79bf35341c428d9e5fd/packages/identus-react/src/context/index.ts#L97)

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

## Since

0.0.1
