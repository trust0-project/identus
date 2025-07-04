[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / useHolder

# Function: useHolder()

> **useHolder**(): [`AgentContextType`](../context/type-aliases/AgentContextType.md) & `object`

Defined in: [hooks/index.ts:358](https://github.com/trust0-project/identus/blob/eac5149d36d22802f0b2a6b3f6d5847d1bc57b57/packages/identus-react/src/hooks/index.ts#L358)

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
