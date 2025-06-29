[**Documentation v0.0.0**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [context](../README.md) / AgentContext

# Variable: AgentContext

> `const` **AgentContext**: `Context`\<`undefined` \| [`AgentContextType`](../type-aliases/AgentContextType.md) & `object`\>

Defined in: [context/index.ts:297](https://github.com/trust0-project/identus/blob/69d1b8333543f0031493d048daa58ec460d110f2/packages/identus-react/src/context/index.ts#L297)

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
