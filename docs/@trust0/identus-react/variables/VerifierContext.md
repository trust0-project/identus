[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / VerifierContext

# Variable: VerifierContext

> `const` **VerifierContext**: `Context`\<`undefined` \| [`AgentContextType`](../type-aliases/AgentContextType.md) & `object`\>

Defined in: [packages/identus-react/src/context/index.ts:469](https://github.com/trust0-project/identus/blob/7ef341f0b701e9b66b325d3a3a164ae85703b461/packages/identus-react/src/context/index.ts#L469)

React context for credential verification operations.

Provides functionality for requesting and verifying credential presentations
from holders. Supports presentation requests and verification of received
credential presentations.

## Example

```tsx
import { VerifierContext } from '@trust0/identus-react/context';
import { useContext } from 'react';
import * as SDK from "@hyperledger/identus-sdk";

function CredentialVerifier() {
  const context = useContext(VerifierContext);
  
  if (!context) {
    throw new Error('CredentialVerifier must be used within VerifierProvider');
  }
  
  const { issuePresentationRequest, verifyPresentation } = context;
  
  const requestAgeVerification = async (holderDID: Domain.DID) => {
    await issuePresentationRequest(
      Domain.CredentialType.JWT,
      holderDID,
      { age: { min: 21 } }
    );
  };
  
  const verifyAgePresentation = async (presentation: Domain.Message) => {
    const isValid = await verifyPresentation(presentation);
    console.log('Age verification result:', isValid);
  };
  
  return (
    <div>
      <button onClick={() => requestAgeVerification(holderDID)}>
        Request Age Verification
      </button>
    </div>
  );
}
```
