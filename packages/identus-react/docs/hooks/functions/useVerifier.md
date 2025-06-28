[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [hooks](../README.md) / useVerifier

# Function: useVerifier()

> **useVerifier**(): `AgentContextType` & `object`

Defined in: [hooks/index.ts:383](https://github.com/trust0-project/identus/blob/9e2680f676c28426e63b93fe6cc608f8725c8297/packages/identus-react/src/hooks/index.ts#L383)

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
