[**Documentation v0.0.0**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [hooks](../README.md) / useHolder

# Function: useHolder()

> **useHolder**(): [`AgentContextType`](../../context/type-aliases/AgentContextType.md) & `object`

Defined in: [hooks/index.ts:352](https://github.com/trust0-project/identus/blob/69d1b8333543f0031493d048daa58ec460d110f2/packages/identus-react/src/hooks/index.ts#L352)

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
