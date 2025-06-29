[**Documentation v0.0.0**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [context](../README.md) / CredentialsContext

# Variable: CredentialsContext

> `const` **CredentialsContext**: `Context`\<`undefined` \| \{ `credentials`: `Credential`[]; `deleteCredential`: (`credential`) => `Promise`\<`void`\>; `fetchCredentials`: () => `Promise`\<`Credential`[]\>; \}\>

Defined in: [context/index.ts:655](https://github.com/trust0-project/identus/blob/69d1b8333543f0031493d048daa58ec460d110f2/packages/identus-react/src/context/index.ts#L655)

React context for credential storage and management.

Provides functionality for managing stored verifiable credentials including
retrieval, deletion, and refresh operations. Central to the credential wallet
functionality.

## Example

```tsx
import { CredentialsContext } from '@trust0/identus-react/context';
import { useContext } from 'react';

function CredentialWallet() {
  const context = useContext(CredentialsContext);
  
  if (!context) {
    throw new Error('CredentialWallet must be used within CredentialsProvider');
  }
  
  const { credentials, deleteCredential, fetchCredentials } = context;
  
  const removeCredential = async (credential: SDK.Domain.Credential) => {
    if (confirm('Delete this credential?')) {
      await deleteCredential(credential);
    }
  };
  
  const refreshCredentials = async () => {
    await fetchCredentials();
  };
  
  return (
    <div>
      <h3>My Credentials ({credentials.length})</h3>
      <button onClick={refreshCredentials}>Refresh</button>
      
      {credentials.map((credential, index) => (
        <div key={index}>
          <h4>{credential.claims.name || 'Unnamed Credential'}</h4>
          <p>Issuer: {credential.issuer}</p>
          <button onClick={() => removeCredential(credential)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```
