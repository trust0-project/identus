[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / MessagesContext

# Variable: MessagesContext

> `const` **MessagesContext**: `Context`\<`undefined` \| \{ `deleteMessage`: (`message`) => `Promise`\<`void`\>; `load`: () => `Promise`\<`void`\>; `messages`: `object`[]; `readMessage`: (`message`) => `Promise`\<`void`\>; `receivedMessages`: [`Message`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]; `sentMessages`: [`Message`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]; `unreadMessages`: [`Message`](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules.md)[]; \}\>

Defined in: [packages/identus-react/src/context/index.ts:637](https://github.com/trust0-project/identus/blob/ded2d976bdd80bcd3ea9c09c69cf5c8c126ffd6a/packages/identus-react/src/context/index.ts#L637)

React context for DIDComm message management.

Provides comprehensive functionality for managing DIDComm messages including
reading, deleting, and organizing messages by type and status. Essential for
handling communication between identity entities.

## Example

```tsx
import { MessagesContext } from '@trust0/identus-react/context';
import { useContext } from 'react';

function MessageInbox() {
  const context = useContext(MessagesContext);
  
  if (!context) {
    throw new Error('MessageInbox must be used within MessagesProvider');
  }
  
  const { 
    messages, 
    unreadMessages, 
    readMessage, 
    deleteMessage 
  } = context;
  
  const markAsRead = async (message: SDK.Domain.Message) => {
    await readMessage(message);
  };
  
  const removeMessage = async (message: SDK.Domain.Message) => {
    await deleteMessage(message);
  };
  
  return (
    <div>
      <h3>Messages ({messages.length})</h3>
      <p>Unread: {unreadMessages.length}</p>
      
      {messages.map((item, index) => (
        <div key={index} className={!item.read ? 'unread' : ''}>
          <p>From: {item.message.from?.toString()}</p>
          <p>Type: {item.message.piuri}</p>
          <button onClick={() => markAsRead(item.message)}>
            Mark as Read
          </button>
          <button onClick={() => removeMessage(item.message)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```
