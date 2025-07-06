[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / IssuerContext

# Variable: IssuerContext

> `const` **IssuerContext**: `Context`\<`undefined` \| [`AgentContextType`](../type-aliases/AgentContextType.md) & `object`\>

Defined in: [packages/identus-react/src/context/index.ts:365](https://github.com/trust0-project/identus/blob/6480fffced88812f48e20542d3492e14ba5fb80e/packages/identus-react/src/context/index.ts#L365)

React context for credential issuance operations.

Provides functionality for creating and issuing verifiable credentials to holders.
Includes support for out-of-band credential offers and direct credential issuance.

## Example

```tsx
import { IssuerContext } from '@trust0/identus-react/context';
import { useContext } from 'react';
import SDK from '@hyperledger/identus-sdk';

function CredentialIssuer() {
  const context = useContext(IssuerContext);
  
  if (!context) {
    throw new Error('CredentialIssuer must be used within IssuerProvider');
  }
  
  const { createOOBOffer, issueCredential, state } = context;
  
  const createDriversLicenseOffer = async () => {
    const offer = await createOOBOffer(
      SDK.Domain.CredentialType.JWT,
      'drivers-license-123',
      {
        name: 'John Doe',
        licenseNumber: 'DL123456',
        expirationDate: '2025-12-31'
      }
    );
    
    // Share offer with holder
    console.log('Credential offer:', offer);
  };
  
  return (
    <div>
      <p>Issuer State: {state}</p>
      <button onClick={createDriversLicenseOffer}>
        Create Driver's License Offer
      </button>
    </div>
  );
}
```
