[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [hooks](../README.md) / useIssuer

# Function: useIssuer()

> **useIssuer**(): `AgentContextType` & `object`

Defined in: [hooks/index.ts:402](https://github.com/trust0-project/identus/blob/5b43368a7bb6070ac216d840cfd9b05d5b51c76b/packages/identus-react/src/hooks/index.ts#L402)

Hook for accessing credential issuance context and operations.

Provides functionality for creating and issuing verifiable credentials to holders.
This hook must be used within an IssuerProvider and requires a running agent.

## Returns

Issuer context containing:
  - `agent`: Current Agent instance or null if not running
  - `start`: Async function to start the agent for issuing operations
  - `stop`: Async function to stop the agent
  - `state`: Current agent state string
  - `createOOBOffer`: Create out-of-band credential offer for holders
  - `issueCredential`: Issue a verifiable credential to a specific holder

## Throws

When used outside of IssuerProvider

## Example

```tsx
import { useIssuer } from '@trust0/identus-react/hooks';
import SDK from '@hyperledger/identus-sdk';

function CredentialIssuer() {
  const { createOOBOffer, issueCredential, state } = useIssuer();
  
  const issueDriversLicense = async () => {
    try {
      // Create out-of-band offer for a driver's license
      const offer = await createOOBOffer(
        SDK.Domain.CredentialType.JWT,
        'drivers-license-123',
        {
          name: 'John Doe',
          licenseNumber: 'DL123456',
          expirationDate: '2025-12-31'
        }
      );
      
      console.log('Credential offer created:', offer);
      
      // Share the offer with the holder
      // ... sharing logic
    } catch (error) {
      console.error('Failed to create credential offer:', error);
    }
  };
  
  return (
    <div>
      <p>Issuer State: {state}</p>
      <button 
        onClick={issueDriversLicense}
        disabled={state !== 'running'}
      >
        Issue Driver's License
      </button>
    </div>
  );
}
```
