[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / useAgent

# Function: useAgent()

> **useAgent**(): [`AgentContextType`](../context/type-aliases/AgentContextType.md) & `object`

Defined in: [hooks/index.ts:294](https://github.com/trust0-project/identus/blob/94eb37ac3e348bfb235eefd303acf4a8e113137e/packages/identus-react/src/hooks/index.ts#L294)

Hook for accessing the main Identus Agent context and operations.

The Agent is the central component that orchestrates all Identus SDK operations
including DIDComm messaging, credential operations, and connection management.
This hook must be used within an AgentProvider.

## Returns

Agent context containing:
  - `agent`: Current Agent instance or null if not initialized
  - `start`: Async function to start the agent and begin operations
  - `stop`: Async function to stop the agent and cleanup resources  
  - `state`: Current agent state string (stopped, starting, running, etc.)
  - `setAgent`: Function to manually set a new agent instance

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
