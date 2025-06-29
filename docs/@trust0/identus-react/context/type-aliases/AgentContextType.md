[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [context](../README.md) / AgentContextType

# Type Alias: AgentContextType

> **AgentContextType** = `object`

Defined in: [context/index.ts:128](https://github.com/trust0-project/identus/blob/3749e9a950934dc175049977b6cd44e590678417/packages/identus-react/src/context/index.ts#L128)

## Properties

### agent

> **agent**: `SDK.Agent` \| `null`

Defined in: [context/index.ts:129](https://github.com/trust0-project/identus/blob/3749e9a950934dc175049977b6cd44e590678417/packages/identus-react/src/context/index.ts#L129)

***

### start()

> **start**: () => `Promise`\<`void`\>

Defined in: [context/index.ts:131](https://github.com/trust0-project/identus/blob/3749e9a950934dc175049977b6cd44e590678417/packages/identus-react/src/context/index.ts#L131)

Function to start the agent

#### Returns

`Promise`\<`void`\>

***

### state

> **state**: `SDK.Domain.Startable.State`

Defined in: [context/index.ts:137](https://github.com/trust0-project/identus/blob/3749e9a950934dc175049977b6cd44e590678417/packages/identus-react/src/context/index.ts#L137)

Current state of the agent
[SDK.Domain.Startable.State](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules/Domain.Protocols.Startable.md)

***

### stop()

> **stop**: () => `Promise`\<`void`\>

Defined in: [context/index.ts:133](https://github.com/trust0-project/identus/blob/3749e9a950934dc175049977b6cd44e590678417/packages/identus-react/src/context/index.ts#L133)

Function to stop the agent

#### Returns

`Promise`\<`void`\>
