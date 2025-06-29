[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@trust0/identus-react](../../README.md) / [context](../README.md) / MessagesContext

# Variable: MessagesContext

> `const` **MessagesContext**: `Context`\<`undefined` \| \{ `deleteMessage`: (`message`) => `Promise`\<`void`\>; `getMessages`: () => `Promise`\<`object`[]\>; `messages`: `object`[]; `readMessage`: (`message`) => `Promise`\<`void`\>; `receivedMessages`: `Message`[]; `sentMessages`: `Message`[]; `unreadMessages`: `Message`[]; \}\>

Defined in: [context/index.ts:587](https://github.com/trust0-project/identus/blob/28f0ae0fec4ff168ccf58335112c5afe61719f88/packages/identus-react/src/context/index.ts#L587)

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
