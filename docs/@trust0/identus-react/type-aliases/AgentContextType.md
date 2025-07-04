[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / AgentContextType

# Type Alias: AgentContextType

> **AgentContextType** = `object`

Defined in: [packages/identus-react/src/context/index.ts:135](https://github.com/trust0-project/identus/blob/1334a53338f8e4342e50542c422da64e1a058e6e/packages/identus-react/src/context/index.ts#L135)

## Properties

### agent

> **agent**: [`SDK.Agent`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md) \| `null`

Defined in: [packages/identus-react/src/context/index.ts:136](https://github.com/trust0-project/identus/blob/1334a53338f8e4342e50542c422da64e1a058e6e/packages/identus-react/src/context/index.ts#L136)

***

### start()

> **start**: () => `Promise`\<`void`\>

Defined in: [packages/identus-react/src/context/index.ts:138](https://github.com/trust0-project/identus/blob/1334a53338f8e4342e50542c422da64e1a058e6e/packages/identus-react/src/context/index.ts#L138)

Function to start the agent

#### Returns

`Promise`\<`void`\>

***

### state

> **state**: [`SDK.Domain.Startable.State`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [packages/identus-react/src/context/index.ts:144](https://github.com/trust0-project/identus/blob/1334a53338f8e4342e50542c422da64e1a058e6e/packages/identus-react/src/context/index.ts#L144)

Current state of the agent
[SDK.Domain.Startable.State](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules/Domain.Protocols.Startable.md)

***

### stop()

> **stop**: () => `Promise`\<`void`\>

Defined in: [packages/identus-react/src/context/index.ts:140](https://github.com/trust0-project/identus/blob/1334a53338f8e4342e50542c422da64e1a058e6e/packages/identus-react/src/context/index.ts#L140)

Function to stop the agent

#### Returns

`Promise`\<`void`\>
