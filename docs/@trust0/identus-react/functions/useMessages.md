[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@trust0/identus-react](../README.md) / useMessages

# Function: useMessages()

> **useMessages**(): `object`

Defined in: [hooks/index.ts:486](https://github.com/trust0-project/identus/blob/6482b5d54913fe08540bba553b4274f2423b6fd4/packages/identus-react/src/hooks/index.ts#L486)

Hook for accessing DIDComm message context and operations.

Provides functionality for managing DIDComm messages including reading, deleting,
and filtering messages by type. This hook must be used within a MessagesProvider.

## Returns

Messages context containing:
  - `messages`: Array of all messages with their read status metadata
  - `receivedMessages`: Filtered array containing only received messages
  - `sentMessages`: Filtered array containing only sent messages
  - `unreadMessages`: Filtered array containing only unread messages
  - `readMessage`: Async function to mark a specific message as read
  - `deleteMessage`: Async function to permanently delete a message
  - `getMessages`: Async function to refresh and reload messages from storage

### deleteMessage()

> **deleteMessage**: (`message`) => `Promise`\<`void`\>

Function to delete a message

#### Parameters

##### message

`Message`

#### Returns

`Promise`\<`void`\>

### getMessages()

> **getMessages**: () => `Promise`\<`object`[]\>

Function to refresh messages from storage

#### Returns

`Promise`\<`object`[]\>

### messages

> **messages**: `object`[]

Array of all messages with their read status

### readMessage()

> **readMessage**: (`message`) => `Promise`\<`void`\>

Function to mark a message as read

#### Parameters

##### message

`Message`

#### Returns

`Promise`\<`void`\>

### receivedMessages

> **receivedMessages**: `Message`[]

Array of received messages only

### sentMessages

> **sentMessages**: `Message`[]

Array of sent messages only

### unreadMessages

> **unreadMessages**: `Message`[]

Array of unread messages only

## Throws

When used outside of MessagesProvider

## Example

```tsx
import { useMessages } from '@trust0/identus-react/hooks';

function MessageInbox() {
  const { 
    messages, 
    unreadMessages, 
    readMessage, 
    deleteMessage,
    getMessages 
  } = useMessages();
  
  const handleReadMessage = async (message) => {
    try {
      await readMessage(message);
      console.log('Message marked as read');
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };
  
  const handleDeleteMessage = async (message) => {
    try {
      await deleteMessage(message);
      console.log('Message deleted');
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };
  
  const refreshMessages = async () => {
    try {
      await getMessages();
      console.log('Messages refreshed');
    } catch (error) {
      console.error('Failed to refresh messages:', error);
    }
  };
  
  return (
    <div>
      <h3>Messages ({messages.length})</h3>
      <p>Unread: {unreadMessages.length}</p>
      
      <button onClick={refreshMessages}>Refresh</button>
      
      {messages.map((item, index) => (
        <div key={index} className={!item.read ? 'unread' : ''}>
          <p>From: {item.message.from?.toString()}</p>
          <p>Type: {item.message.piuri}</p>
          <button onClick={() => handleReadMessage(item.message)}>
            Mark as Read
          </button>
          <button onClick={() => handleDeleteMessage(item.message)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```
