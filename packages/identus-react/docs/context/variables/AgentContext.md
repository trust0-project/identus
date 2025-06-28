[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [context](../README.md) / AgentContext

# Variable: AgentContext

> `const` **AgentContext**: `Context`\<`undefined` \| `AgentContextType` & `object`\>

Defined in: [context/index.ts:311](https://github.com/trust0-project/identus/blob/954e2761ec12ee676172e43e60153139e8242a10/packages/identus-react/src/context/index.ts#L311)

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

## Since

0.0.1
