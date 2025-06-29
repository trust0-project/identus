[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [context](../README.md) / AgentContextType

# Type Alias: AgentContextType

> **AgentContextType** = `object`

Defined in: [context/index.ts:128](https://github.com/trust0-project/identus/blob/8a58c4c511d6150caafecc2e17057355cee108a6/packages/identus-react/src/context/index.ts#L128)

## Properties

### agent

> **agent**: [`SDK.Agent`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md) \| `null`

Defined in: [context/index.ts:129](https://github.com/trust0-project/identus/blob/8a58c4c511d6150caafecc2e17057355cee108a6/packages/identus-react/src/context/index.ts#L129)

***

### start()

> **start**: () => `Promise`\<`void`\>

Defined in: [context/index.ts:131](https://github.com/trust0-project/identus/blob/8a58c4c511d6150caafecc2e17057355cee108a6/packages/identus-react/src/context/index.ts#L131)

Function to start the agent

#### Returns

`Promise`\<`void`\>

***

### state

> **state**: [`SDK.Domain.Startable.State`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [context/index.ts:137](https://github.com/trust0-project/identus/blob/8a58c4c511d6150caafecc2e17057355cee108a6/packages/identus-react/src/context/index.ts#L137)

Current state of the agent
[SDK.Domain.Startable.State](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules/Domain.Protocols.Startable.md)

***

### stop()

> **stop**: () => `Promise`\<`void`\>

Defined in: [context/index.ts:133](https://github.com/trust0-project/identus/blob/8a58c4c511d6150caafecc2e17057355cee108a6/packages/identus-react/src/context/index.ts#L133)

Function to stop the agent

#### Returns

`Promise`\<`void`\>
