[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [hooks](../README.md) / useVerifier

# Function: useVerifier()

> **useVerifier**(): `AgentContextType` & `object`

Defined in: [hooks/index.ts:556](https://github.com/trust0-project/identus/blob/5b43368a7bb6070ac216d840cfd9b05d5b51c76b/packages/identus-react/src/hooks/index.ts#L556)

Hook for accessing credential verification context and operations.

Provides functionality for requesting and verifying credential presentations
from holders. This hook must be used within a VerifierProvider and requires a running agent.

## Returns

Verifier context containing:
  - `agent`: Current Agent instance or null if not running
  - `start`: Async function to start the agent for verification operations
  - `stop`: Async function to stop the agent
  - `state`: Current agent state string
  - `issuePresentationRequest`: Send presentation requests to credential holders
  - `verifyPresentation`: Verify and validate received credential presentations

## Throws

When used outside of VerifierProvider

## Example

```tsx
import { useVerifier } from '@trust0/identus-react/hooks';
import SDK from '@hyperledger/identus-sdk';

function CredentialVerifier() {
  const { issuePresentationRequest, verifyPresentation } = useVerifier();
  
  const requestAgeProof = async (holderDID) => {
    try {
      // Request age verification from holder
      await issuePresentationRequest(
        SDK.Domain.CredentialType.JWT,
        holderDID,
        {
          age: { min: 21 } // Request proof of age 21+
        }
      );
      
      console.log('Age verification request sent');
    } catch (error) {
      console.error('Failed to request age proof:', error);
    }
  };
  
  const verifyAgePresentation = async (presentationMessage) => {
    try {
      const isValid = await verifyPresentation(presentationMessage);
      
      if (isValid) {
        console.log('Age verification successful - access granted');
      } else {
        console.log('Age verification failed - access denied');
      }
    } catch (error) {
      console.error('Failed to verify presentation:', error);
    }
  };
  
  return (
    <div>
      <button onClick={() => requestAgeProof(holderDID)}>
        Request Age Verification
      </button>
    </div>
  );
}
```
