[**Documentation v0.0.0**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [context](../README.md) / AgentContextType

# Type Alias: AgentContextType

> **AgentContextType** = `object`

Defined in: [context/index.ts:130](https://github.com/trust0-project/identus/blob/0e8c6d00246cbdbd7d213e9d5c311624e464003f/packages/identus-react/src/context/index.ts#L130)

## Properties

### agent

> **agent**: `SDK.Agent` \| `null`

Defined in: [context/index.ts:136](https://github.com/trust0-project/identus/blob/0e8c6d00246cbdbd7d213e9d5c311624e464003f/packages/identus-react/src/context/index.ts#L136)

#### Link

https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/classes/Agent.md

***

### start()

> **start**: () => `Promise`\<`void`\>

Defined in: [context/index.ts:138](https://github.com/trust0-project/identus/blob/0e8c6d00246cbdbd7d213e9d5c311624e464003f/packages/identus-react/src/context/index.ts#L138)

Function to start the agent

#### Returns

`Promise`\<`void`\>

***

### state

> **state**: `SDK.Domain.Startable.State`

Defined in: [context/index.ts:144](https://github.com/trust0-project/identus/blob/0e8c6d00246cbdbd7d213e9d5c311624e464003f/packages/identus-react/src/context/index.ts#L144)

Current state of the agent
[SDK.Domain.Startable.State](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules/Domain.Protocols.Startable.md)

***

### stop()

> **stop**: () => `Promise`\<`void`\>

Defined in: [context/index.ts:140](https://github.com/trust0-project/identus/blob/0e8c6d00246cbdbd7d213e9d5c311624e464003f/packages/identus-react/src/context/index.ts#L140)

Function to stop the agent

#### Returns

`Promise`\<`void`\>
