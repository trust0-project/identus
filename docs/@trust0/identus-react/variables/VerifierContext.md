[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / VerifierContext

# Variable: VerifierContext

> `const` **VerifierContext**: `Context`\<`undefined` \| [`AgentContextType`](../type-aliases/AgentContextType.md) & `object`\>

Defined in: [packages/identus-react/src/context/index.ts:463](https://github.com/trust0-project/identus/blob/c5547f02425fb2c8e0a9806f3e808f5149ca3675/packages/identus-react/src/context/index.ts#L463)

React context for credential verification operations.

Provides functionality for requesting and verifying credential presentations
from holders. Supports presentation requests and verification of received
credential presentations.

## Example

```tsx
import { VerifierContext } from '@trust0/identus-react/context';
import { useContext } from 'react';
import SDK from '@hyperledger/identus-sdk';

function CredentialVerifier() {
  const context = useContext(VerifierContext);
  
  if (!context) {
    throw new Error('CredentialVerifier must be used within VerifierProvider');
  }
  
  const { issuePresentationRequest, verifyPresentation } = context;
  
  const requestAgeVerification = async (holderDID: SDK.Domain.DID) => {
    await issuePresentationRequest(
      SDK.Domain.CredentialType.JWT,
      holderDID,
      { age: { min: 21 } }
    );
  };
  
  const verifyAgePresentation = async (presentation: SDK.Domain.Message) => {
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
