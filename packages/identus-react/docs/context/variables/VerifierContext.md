[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [context](../README.md) / VerifierContext

# Variable: VerifierContext

> `const` **VerifierContext**: `Context`\<`undefined` \| `AgentContextType` & `object`\>

Defined in: [context/index.ts:446](https://github.com/trust0-project/identus/blob/9e2680f676c28426e63b93fe6cc608f8725c8297/packages/identus-react/src/context/index.ts#L446)

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

## Since

0.0.1
