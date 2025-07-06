[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / useConnections

# Function: useConnections()

> **useConnections**(): `object`

Defined in: [packages/identus-react/src/hooks/useConnections.ts:64](https://github.com/trust0-project/identus/blob/e9bdec33ebd589ffac0cefb921f5bba7c9fcda33/packages/identus-react/src/hooks/useConnections.ts#L64)

Hook for accessing DID connection context and operations.

Provides functionality for managing established DID connections (relationships
between DIDs) including viewing and deleting connections. This hook must be
used within a ConnectionsProvider.

## Returns

Connections context

### connections

> **connections**: [`DIDPair`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]

Array of established DID connections

### deleteConnection()

> **deleteConnection**: (`connection`) => `Promise`\<`void`\>

Function to delete a connection

#### Parameters

##### connection

[`DIDPair`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

#### Returns

`Promise`\<`void`\>

## Throws

When used outside of ConnectionsProvider

## Example

```tsx
import { useConnections } from '@trust0/identus-react/hooks';

function ConnectionManager() {
  const { connections, deleteConnection } = useConnections();
  
  const handleDeleteConnection = async (connection) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      try {
        await deleteConnection(connection);
        console.log('Connection deleted successfully');
      } catch (error) {
        console.error('Failed to delete connection:', error);
      }
    }
  };
  
  return (
    <div>
      <h3>My Connections ({connections.length})</h3>
      
      {connections.map((connection, index) => (
        <div key={index} className="connection-card">
          <h4>Connection {index + 1}</h4>
          <p>Host: {connection.host.toString()}</p>
          <p>Receiver: {connection.receiver.toString()}</p>
          <p>Name: {connection.name || 'Unnamed Connection'}</p>
          
          <button 
            onClick={() => handleDeleteConnection(connection)}
            className="delete-button"
          >
            Delete Connection
          </button>
        </div>
      ))}
      
      {connections.length === 0 && (
        <p>No connections established. Create a connection to get started.</p>
      )}
    </div>
  );
}
```
