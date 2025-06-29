[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / useIssuer

# Function: useIssuer()

> **useIssuer**(): [`AgentContextType`](../context/type-aliases/AgentContextType.md) & `object`

Defined in: [hooks/index.ts:325](https://github.com/trust0-project/identus/blob/6482b5d54913fe08540bba553b4274f2423b6fd4/packages/identus-react/src/hooks/index.ts#L325)

Hook for accessing credential issuance context and operations.

Provides functionality for creating and issuing verifiable credentials to holders.
This hook must be used within an IssuerProvider and requires a running agent.

## Returns

Issuer context containing:
  - `agent`: Current Agent instance or null if not running
  - `start`: Async function to start the agent for issuing operations
  - `stop`: Async function to stop the agent
  - `state`: Current agent state string
  - `createOOBOffer`: Create out-of-band credential offer for holders
  - `issueCredential`: Issue a verifiable credential to a specific holder

## Throws

When used outside of IssuerProvider
