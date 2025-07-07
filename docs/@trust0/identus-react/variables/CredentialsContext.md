[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / CredentialsContext

# Variable: CredentialsContext

> `const` **CredentialsContext**: `Context`\<`undefined` \| \{ `credentials`: [`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]; `deleteCredential`: (`credential`) => `Promise`\<`void`\>; `fetchCredentials`: () => `Promise`\<[`Credential`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]\>; \}\>

Defined in: [packages/identus-react/src/context/index.ts:699](https://github.com/trust0-project/identus/blob/f4c5ad73fe8f38584285c5a8909e20cab5522a16/packages/identus-react/src/context/index.ts#L699)

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
