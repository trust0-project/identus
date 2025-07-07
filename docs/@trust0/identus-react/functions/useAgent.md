[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / useAgent

# Function: useAgent()

> **useAgent**(): `object`

Defined in: [packages/identus-react/src/hooks/useAgent.ts:66](https://github.com/trust0-project/identus/blob/1810b9b48611f873dc00ce7103b781ea933441ae/packages/identus-react/src/hooks/useAgent.ts#L66)

Hook for accessing the main Identus Agent context and operations.

The Agent is the central component that orchestrates all Identus SDK operations
including DIDComm messaging, credential operations, and connection management.
This hook must be used within an AgentProvider.

## Returns

Agent context object with agent management functionality

### agent

> **agent**: `null` \| [`Agent`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Current Agent instance or null if not initialized

### setAgent()

> **setAgent**: (`agent`) => `void`

Function to manually set a new agent instance

#### Parameters

##### agent

[`Agent`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

#### Returns

`void`

### start()

> **start**: () => `Promise`\<`void`\>

Function to start the agent and begin operations

#### Returns

`Promise`\<`void`\>

### state

> **state**: [`State`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Current agent state (stopped, starting, running, etc.)

### stop()

> **stop**: () => `Promise`\<`void`\>

Function to stop the agent and cleanup resources

#### Returns

`Promise`\<`void`\>

## Throws

When used outside of AgentProvider

## Example

```tsx
import { useAgent } from '@trust0/identus-react/hooks';

function AgentController() {
  const { agent, start, stop, state, setAgent } = useAgent();
  
  const handleStart = async () => {
    try {
      await start();
      console.log('Agent started successfully');
    } catch (error) {
      console.error('Failed to start agent:', error);
    }
  };
  
  const handleStop = async () => {
    try {
      await stop();
      console.log('Agent stopped successfully');
    } catch (error) {
      console.error('Failed to stop agent:', error);
    }
  };
  
  return (
    <div>
      <p>Agent State: {state}</p>
      <div>
        <button onClick={handleStart} disabled={state === 'running'}>
          Start Agent
        </button>
        <button onClick={handleStop} disabled={state === 'stopped'}>
          Stop Agent
        </button>
      </div>
      {agent && <p>Agent ID: {agent.getCurrentDID()?.toString()}</p>}
    </div>
  );
}
```
