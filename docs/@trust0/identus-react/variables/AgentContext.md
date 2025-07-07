[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / AgentContext

# Variable: AgentContext

> `const` **AgentContext**: `Context`\<`undefined` \| \{ `agent`: `null` \| [`Agent`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md); `setAgent`: (`agent`) => `void`; `start`: () => `Promise`\<`void`\>; `state`: [`State`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md); `stop`: () => `Promise`\<`void`\>; \}\>

Defined in: [packages/identus-react/src/context/index.ts:315](https://github.com/trust0-project/identus/blob/1810b9b48611f873dc00ce7103b781ea933441ae/packages/identus-react/src/context/index.ts#L315)

React context for managing the main Identus Agent operations.

The Agent is the central orchestrator for all Identus SDK operations including
DIDComm messaging, credential operations, and connection management. This context
provides access to agent lifecycle management and core functionality.

## Example

```tsx
import { AgentContext } from '@trust0/identus-react/context';
import { useContext } from 'react';

function AgentManager() {
  const context = useContext(AgentContext);
  
  if (!context) {
    throw new Error('AgentManager must be used within AgentProvider');
  }
  
  const { agent, start, stop, state, setAgent } = context;
  
  const handleStart = async () => {
    try {
      await start();
      console.log('Agent started successfully');
    } catch (error) {
      console.error('Failed to start agent:', error);
    }
  };
  
  return (
    <div>
      <p>Agent State: {state}</p>
      <button onClick={handleStart} disabled={state === 'running'}>
        Start Agent
      </button>
      <button onClick={stop} disabled={state !== 'running'}>
        Stop Agent
      </button>
    </div>
  );
}
```
