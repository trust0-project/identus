[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [context](../README.md) / IssuerContext

# Variable: IssuerContext

> `const` **IssuerContext**: `Context`\<`undefined` \| `AgentContextType` & `object`\>

Defined in: [context/index.ts:366](https://github.com/trust0-project/identus/blob/5b43368a7bb6070ac216d840cfd9b05d5b51c76b/packages/identus-react/src/context/index.ts#L366)

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

## Since

0.0.1
