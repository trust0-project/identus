[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [hooks](../README.md) / useCredentials

# Function: useCredentials()

> **useCredentials**(): `object`

Defined in: [hooks/index.ts:562](https://github.com/trust0-project/identus/blob/6e116e70ebca69fb9f7ae79bf35341c428d9e5fd/packages/identus-react/src/hooks/index.ts#L562)

Hook for accessing credential storage context and operations.

Provides functionality for managing stored verifiable credentials including
retrieval, deletion, and refresh operations. This hook must be used within
a CredentialsProvider.

## Returns

Credentials context containing:
  - `credentials`: Array of all stored verifiable credentials
  - `deleteCredential`: Async function to permanently delete a credential
  - `fetchCredentials`: Async function to refresh credentials from storage

### credentials

> **credentials**: `Credential`[]

Array of stored credentials

### deleteCredential()

> **deleteCredential**: (`credential`) => `Promise`\<`void`\>

Function to delete a credential

#### Parameters

##### credential

`Credential`

#### Returns

`Promise`\<`void`\>

### fetchCredentials()

> **fetchCredentials**: () => `Promise`\<`Credential`[]\>

Function to refresh credentials from storage

#### Returns

`Promise`\<`Credential`[]\>

## Throws

When used outside of CredentialsProvider

## Example

```tsx
import { useCredentials } from '@trust0/identus-react/hooks';

function CredentialWallet() {
  const { credentials, deleteCredential, fetchCredentials } = useCredentials();
  
  const handleDeleteCredential = async (credential) => {
    if (window.confirm('Are you sure you want to delete this credential?')) {
      try {
        await deleteCredential(credential);
        console.log('Credential deleted successfully');
      } catch (error) {
        console.error('Failed to delete credential:', error);
      }
    }
  };
  
  const refreshCredentials = async () => {
    try {
      await fetchCredentials();
      console.log('Credentials refreshed');
    } catch (error) {
      console.error('Failed to refresh credentials:', error);
    }
  };
  
  return (
    <div>
      <h3>My Credentials ({credentials.length})</h3>
      <button onClick={refreshCredentials}>Refresh</button>
      
      {credentials.map((credential, index) => (
        <div key={index} className="credential-card">
          <h4>{credential.claims.name || 'Unnamed Credential'}</h4>
          <p>Issuer: {credential.issuer}</p>
          <p>Type: {credential.credentialType}</p>
          <p>ID: {credential.id}</p>
          
          <button 
            onClick={() => handleDeleteCredential(credential)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}
      
      {credentials.length === 0 && (
        <p>No credentials stored. Accept a credential offer to get started.</p>
      )}
    </div>
  );
}
```
