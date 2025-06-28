[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [context](../README.md) / AgentContextType

# Type Alias: AgentContextType

> `private` **AgentContextType** = `object`

Defined in: [context/index.ts:139](https://github.com/trust0-project/identus/blob/7c3040eb306e8d11ac7215cdeff98684d68823c4/packages/identus-react/src/context/index.ts#L139)

Type definition for agent context functionality.

## Properties

### agent

> **agent**: `SDK.Agent` \| `null`

Defined in: [context/index.ts:141](https://github.com/trust0-project/identus/blob/7c3040eb306e8d11ac7215cdeff98684d68823c4/packages/identus-react/src/context/index.ts#L141)

Current Agent instance, null if not initialized

***

### start()

> **start**: () => `Promise`\<`void`\>

Defined in: [context/index.ts:143](https://github.com/trust0-project/identus/blob/7c3040eb306e8d11ac7215cdeff98684d68823c4/packages/identus-react/src/context/index.ts#L143)

Function to start the agent

#### Returns

`Promise`\<`void`\>

***

### state

> **state**: `SDK.Domain.Startable.State`

Defined in: [context/index.ts:147](https://github.com/trust0-project/identus/blob/7c3040eb306e8d11ac7215cdeff98684d68823c4/packages/identus-react/src/context/index.ts#L147)

Current state of the agent

***

### stop()

> **stop**: () => `Promise`\<`void`\>

Defined in: [context/index.ts:145](https://github.com/trust0-project/identus/blob/7c3040eb306e8d11ac7215cdeff98684d68823c4/packages/identus-react/src/context/index.ts#L145)

Function to stop the agent

#### Returns

`Promise`\<`void`\>
