[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / CredentialsContext

# Variable: CredentialsContext

> `const` **CredentialsContext**: `Context`\<`undefined` \| \{ `credentials`: [`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]; `deleteCredential`: (`credential`) => `Promise`\<`void`\>; `load`: () => `Promise`\<`void`\>; \}\>

Defined in: [packages/identus-react/src/context/index.ts:703](https://github.com/trust0-project/identus/blob/a6691e588219d32de5fbabc2f0f2392caeb94cf4/packages/identus-react/src/context/index.ts#L703)

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
