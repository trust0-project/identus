[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / AgentContextType

# Type Alias: AgentContextType

> **AgentContextType** = `object`

Defined in: [packages/identus-react/src/context/index.ts:141](https://github.com/trust0-project/identus/blob/69216c2306136a7e99c13571ddb5c7af3c45b791/packages/identus-react/src/context/index.ts#L141)

## Properties

### agent

> **agent**: [`SDK.Agent`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md) \| `null`

Defined in: [packages/identus-react/src/context/index.ts:142](https://github.com/trust0-project/identus/blob/69216c2306136a7e99c13571ddb5c7af3c45b791/packages/identus-react/src/context/index.ts#L142)

***

### start()

> **start**: () => `Promise`\<`void`\>

Defined in: [packages/identus-react/src/context/index.ts:144](https://github.com/trust0-project/identus/blob/69216c2306136a7e99c13571ddb5c7af3c45b791/packages/identus-react/src/context/index.ts#L144)

Function to start the agent

#### Returns

`Promise`\<`void`\>

***

### state

> **state**: [`SDK.Domain.Startable.State`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [packages/identus-react/src/context/index.ts:150](https://github.com/trust0-project/identus/blob/69216c2306136a7e99c13571ddb5c7af3c45b791/packages/identus-react/src/context/index.ts#L150)

Current state of the agent
[SDK.Domain.Startable.State](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules/Domain.Protocols.Startable.md)

***

### stop()

> **stop**: () => `Promise`\<`void`\>

Defined in: [packages/identus-react/src/context/index.ts:146](https://github.com/trust0-project/identus/blob/69216c2306136a7e99c13571ddb5c7af3c45b791/packages/identus-react/src/context/index.ts#L146)

Function to stop the agent

#### Returns

`Promise`\<`void`\>
