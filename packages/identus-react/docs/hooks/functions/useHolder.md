[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [hooks](../README.md) / useHolder

# Function: useHolder()

> **useHolder**(): `AgentContextType` & `object`

Defined in: [hooks/index.ts:476](https://github.com/trust0-project/identus/blob/5b43368a7bb6070ac216d840cfd9b05d5b51c76b/packages/identus-react/src/hooks/index.ts#L476)

Hook for accessing credential holder context and operations.

Provides functionality for receiving, storing, and presenting verifiable credentials.
This hook must be used within a HolderProvider and requires a running agent.

## Returns

Holder context containing:
  - `agent`: Current Agent instance or null if not running
  - `start`: Async function to start the agent for holder operations
  - `stop`: Async function to stop the agent
  - `state`: Current agent state string
  - `parseOOBOffer`: Parse and validate out-of-band credential offers
  - `acceptOOBOffer`: Accept and store offered credentials in wallet
  - `handlePresentationRequest`: Respond to verifier presentation requests

## Throws

When used outside of HolderProvider

## Example

```tsx
import { useHolder } from '@trust0/identus-react/hooks';

function CredentialHolder() {
  const { parseOOBOffer, acceptOOBOffer, handlePresentationRequest } = useHolder();
  
  const acceptCredentialOffer = async (offerUrl: string) => {
    try {
      // Parse the out-of-band offer
      const selfPeerDID = await createPeerDID(); // Your peer DID
      const message = await parseOOBOffer(offerUrl, selfPeerDID);
      
      // Accept the offer
      await acceptOOBOffer(message);
      
      console.log('Credential offer accepted and stored');
    } catch (error) {
      console.error('Failed to accept credential offer:', error);
    }
  };
  
  const respondToRequest = async (requestMessage, credential) => {
    try {
      await handlePresentationRequest(requestMessage, credential);
      console.log('Presentation sent successfully');
    } catch (error) {
      console.error('Failed to send presentation:', error);
    }
  };
  
  return (
    <div>
      <button onClick={() => acceptCredentialOffer('https://...')}>
        Accept Credential Offer
      </button>
    </div>
  );
}
```
