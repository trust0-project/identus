[**Documentation v0.0.0**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [context](../README.md) / ConnectionsContext

# Variable: ConnectionsContext

> `const` **ConnectionsContext**: `Context`\<`undefined` \| \{ `connections`: `DIDPair`[]; `deleteConnection`: (`connection`) => `Promise`\<`void`\>; \}\>

Defined in: [context/index.ts:718](https://github.com/trust0-project/identus/blob/0e8c6d00246cbdbd7d213e9d5c311624e464003f/packages/identus-react/src/context/index.ts#L718)

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
