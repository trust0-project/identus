[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [hooks](../README.md) / useVerifier

# Function: useVerifier()

> **useVerifier**(): [`AgentContextType`](../../context/type-aliases/AgentContextType.md) & `object`

Defined in: [hooks/index.ts:383](https://github.com/trust0-project/identus/blob/b4ede682a782af9435b8aeff2f2edb2fc71c7d92/packages/identus-react/src/hooks/index.ts#L383)

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
