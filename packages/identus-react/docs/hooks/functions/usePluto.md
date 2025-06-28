[**@trust0/identus-react**](../../README.md)

***

[@trust0/identus-react](../../README.md) / [hooks](../README.md) / usePluto

# Function: usePluto()

> **usePluto**(`storageType`): `Pluto`

Defined in: [hooks/index.ts:198](https://github.com/trust0-project/identus/blob/5b43368a7bb6070ac216d840cfd9b05d5b51c76b/packages/identus-react/src/hooks/index.ts#L198)

Creates and returns a memoized Pluto instance for persistent storage operations.

Pluto is the storage layer of the Identus SDK that handles persistence of credentials,
DIDs, keys, and other identity-related data. It supports multiple storage backends.

## Parameters

### storageType

Storage backend to use (defaults to IndexedDB)

*typeof* `BaseStorage` | `StorageType`

## Returns

`Pluto`

A memoized Pluto instance configured with the specified storage

## Example

```tsx
import { usePluto } from '@trust0/identus-react/hooks';
import { StorageType } from '@trust0/ridb';

function StorageManager() {
  // Use default IndexedDB storage
  const pluto = usePluto();
  
  // Use specific storage type
  const plutoWithMemory = usePluto(StorageType.Memory);
  
  const storeCredential = async (credential) => {
    try {
      await pluto.storeCredential(credential);
      console.log('Credential stored successfully');
    } catch (error) {
      console.error('Failed to store credential:', error);
    }
  };
  
  const retrieveCredentials = async () => {
    try {
      const credentials = await pluto.getAllCredentials();
      console.log('Retrieved credentials:', credentials);
    } catch (error) {
      console.error('Failed to retrieve credentials:', error);
    }
  };
  
  return (
    <div>
      <button onClick={retrieveCredentials}>Load Credentials</button>
    </div>
  );
}
```
