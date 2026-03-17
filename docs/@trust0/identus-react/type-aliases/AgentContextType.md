[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / AgentContextType

# Type Alias: AgentContextType

> **AgentContextType** = `object`

Defined in: [packages/identus-react/src/context/index.ts:142](https://github.com/trust0-project/identus/blob/a942bd669aab1936b2648e7368fc4fdab8cc17cc/packages/identus-react/src/context/index.ts#L142)

## Properties

### agent

> **agent**: [`Agent`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md) \| `null`

Defined in: [packages/identus-react/src/context/index.ts:143](https://github.com/trust0-project/identus/blob/a942bd669aab1936b2648e7368fc4fdab8cc17cc/packages/identus-react/src/context/index.ts#L143)

***

### start()

> **start**: () => `Promise`\<`void`\>

Defined in: [packages/identus-react/src/context/index.ts:145](https://github.com/trust0-project/identus/blob/a942bd669aab1936b2648e7368fc4fdab8cc17cc/packages/identus-react/src/context/index.ts#L145)

Function to start the agent

#### Returns

`Promise`\<`void`\>

***

### state

> **state**: [`Domain.Startable.State`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)

Defined in: [packages/identus-react/src/context/index.ts:151](https://github.com/trust0-project/identus/blob/a942bd669aab1936b2648e7368fc4fdab8cc17cc/packages/identus-react/src/context/index.ts#L151)

Current state of the agent
[Domain.Startable.State](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules/Domain.Protocols.Startable.md)

***

### stop()

> **stop**: () => `Promise`\<`void`\>

Defined in: [packages/identus-react/src/context/index.ts:147](https://github.com/trust0-project/identus/blob/a942bd669aab1936b2648e7368fc4fdab8cc17cc/packages/identus-react/src/context/index.ts#L147)

Function to stop the agent

#### Returns

`Promise`\<`void`\>
