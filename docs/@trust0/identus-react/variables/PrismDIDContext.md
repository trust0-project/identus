[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / PrismDIDContext

# Variable: PrismDIDContext

> `const` **PrismDIDContext**: `Context`\<`undefined` \| \{ `create`: (`alias`) => `Promise`\<`void`\>; `prismDID`: `null` \| [`DID`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md); \}\>

Defined in: [packages/identus-react/src/context/index.ts:52](https://github.com/trust0-project/identus/blob/ff26890bfce71f2c24afaf0e6387df14285284cd/packages/identus-react/src/context/index.ts#L52)

React context for managing Prism DID operations and state.

Prism DIDs are long-lived, blockchain-anchored identifiers that provide
persistent, verifiable identity on the Cardano network. This context manages
the creation and state of Prism DIDs within the application.

## Example

```tsx
import { PrismDIDContext } from '@trust0/identus-react/context';
import { useContext } from 'react';

function PrismDIDManager() {
  const context = useContext(PrismDIDContext);
  
  if (!context) {
    throw new Error('PrismDIDManager must be used within PrismDIDProvider');
  }
  
  const { prismDID, create } = context;
  
  const handleCreateDID = async () => {
    await create('my-main-identity');
  };
  
  return (
    <div>
      {prismDID ? (
        <p>Prism DID: {prismDID.toString()}</p>
      ) : (
        <button onClick={handleCreateDID}>Create Prism DID</button>
      )}
    </div>
  );
}
```
