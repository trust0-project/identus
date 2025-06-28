[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [context](../README.md) / HolderContext

# Variable: HolderContext

> `const` **HolderContext**: `Context`\<`undefined` \| `AgentContextType` & `object`\>

Defined in: [context/index.ts:518](https://github.com/trust0-project/identus/blob/febcd2542e30b741b517312de202d6c8715053f6/packages/identus-react/src/context/index.ts#L518)

React context for credential holder operations.

Provides functionality for receiving, storing, and presenting verifiable credentials.
Includes support for parsing credential offers, accepting credentials, and responding
to presentation requests.

## Example

```tsx
import { HolderContext } from '@trust0/identus-react/context';
import { useContext } from 'react';

function CredentialHolder() {
  const context = useContext(HolderContext);
  
  if (!context) {
    throw new Error('CredentialHolder must be used within HolderProvider');
  }
  
  const { parseOOBOffer, acceptOOBOffer, handlePresentationRequest } = context;
  
  const acceptCredentialOffer = async (offerUrl: string, peerDID: SDK.Domain.DID) => {
    try {
      // Parse the offer
      const message = await parseOOBOffer(offerUrl, peerDID);
      
      // Accept and store the credential
      await acceptOOBOffer(message);
      
      console.log('Credential accepted and stored');
    } catch (error) {
      console.error('Failed to accept credential:', error);
    }
  };
  
  return (
    <div>
      <button onClick={() => acceptCredentialOffer(offerUrl, myPeerDID)}>
        Accept Credential Offer
      </button>
    </div>
  );
}
```

## Since

0.0.1
