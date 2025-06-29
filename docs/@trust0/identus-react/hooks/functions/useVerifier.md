[**Documentation v0.0.0**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [hooks](../README.md) / useVerifier

# Function: useVerifier()

> **useVerifier**(): [`AgentContextType`](../../context/type-aliases/AgentContextType.md) & `object`

Defined in: [hooks/index.ts:383](https://github.com/trust0-project/identus/blob/69d1b8333543f0031493d048daa58ec460d110f2/packages/identus-react/src/hooks/index.ts#L383)

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
