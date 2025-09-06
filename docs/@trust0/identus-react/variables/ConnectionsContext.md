[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / ConnectionsContext

# Variable: ConnectionsContext

> `const` **ConnectionsContext**: `Context`\<`undefined` \| \{ `connections`: [`DIDPair`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]; `deleteConnection`: (`connection`) => `Promise`\<`void`\>; `load`: () => `Promise`\<`void`\>; \}\>

Defined in: [packages/identus-react/src/context/index.ts:762](https://github.com/trust0-project/identus/blob/f5b47889e96dca5bb9f8d458aaab7ee1b2f8f868/packages/identus-react/src/context/index.ts#L762)

React context for DID connection management.

Provides functionality for managing established DID connections (relationships
between DIDs) including viewing and deleting connections. Essential for managing
the network of trusted relationships in an identity system.

## Example

```tsx
import { ConnectionsContext } from '@trust0/identus-react/context';
import { useContext } from 'react';

function ConnectionManager() {
  const context = useContext(ConnectionsContext);
  
  if (!context) {
    throw new Error('ConnectionManager must be used within ConnectionsProvider');
  }
  
  const { connections, deleteConnection } = context;
  
  const removeConnection = async (connection: SDK.Domain.DIDPair) => {
    if (confirm('Delete this connection?')) {
      await deleteConnection(connection);
    }
  };
  
  return (
    <div>
      <h3>My Connections ({connections.length})</h3>
      
      {connections.map((connection, index) => (
        <div key={index}>
          <h4>Connection {index + 1}</h4>
          <p>Host: {connection.host.toString()}</p>
          <p>Receiver: {connection.receiver.toString()}</p>
          <button onClick={() => removeConnection(connection)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```
