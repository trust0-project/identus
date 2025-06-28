import SDK from "@hyperledger/identus-sdk";
import { useContext, useMemo } from "react";
import { AgentContext, CredentialsContext, MessagesContext, IssuerContext, HolderContext, VerifierContext, ConnectionsContext, PrismDIDContext, PeerDIDContext, DatabaseContext } from "../context";
import { useRIDB } from "@trust0/ridb-react";
import { schemas } from "../db";
import { createStore } from "@trust0/identus-store";
import { StorageType } from "@trust0/ridb";
import { BaseStorage } from "@trust0/ridb-core";

/**
 * Creates and returns a memoized instance of Apollo DID resolver.
 * 
 * Apollo is the DID resolver component of the Identus SDK that handles resolving
 * Decentralized Identifiers (DIDs) to their corresponding DID Documents.
 * 
 * @returns {SDK.Domain.Apollo} A memoized Apollo instance for DID resolution
 * 
 * @example
 * ```tsx
 * import { useApollo } from '@trust0/identus-react/hooks';
 * 
 * function DIDResolver() {
 *   const apollo = useApollo();
 *   
 *   const resolveDID = async (didString: string) => {
 *     try {
 *       const didDocument = await apollo.resolveDID(didString);
 *       console.log('Resolved DID Document:', didDocument);
 *     } catch (error) {
 *       console.error('Failed to resolve DID:', error);
 *     }
 *   };
 *   
 *   return (
 *     <button onClick={() => resolveDID('did:prism:example')}>
 *       Resolve DID
 *     </button>
 *   );
 * }
 * ```
 * 
 */
export function useApollo() {
    const apollo = useMemo(() => new SDK.Apollo(), []);
    return apollo;
}

/**
 * Type definition for additional DID resolvers that can be passed to Castor.
 * 
 * @public
 */
export type ExtraResolver = new (apollo: SDK.Domain.Apollo) => SDK.Domain.DIDResolver;

/**
 * Creates and returns a memoized instance of Castor with optional additional resolvers.
 * 
 * Castor is the cryptographic component of the Identus SDK responsible for DID operations,
 * key management, and cryptographic functions. It can be extended with additional DID resolvers.
 * 
 * @param resolvers - Array of additional DID resolver constructors to extend Castor functionality
 * @returns {SDK.Domain.Castor} A memoized Castor instance with configured resolvers
 * 
 * @example
 * ```tsx
 * import { useCastor } from '@trust0/identus-react/hooks';
 * 
 * function DIDManager() {
 *   // Basic usage without additional resolvers
 *   const castor = useCastor();
 *   
 *   // Usage with custom resolvers
 *   const castorWithResolvers = useCastor([CustomResolver1, CustomResolver2]);
 *   
 *   const resolveDID = async () => {
 *     try {
 *       const didDocument = await castor.resolveDID(SDK.Domain.DID.fromString('did:prism:example'));
 *       console.log('Resolved DID:', didDocument.toString());
 *     } catch (error) {
 *       console.error('Failed to resolve DID:', error);
 *     }
 *   };
 *   
 *   return (
 *     <button onClick={resolveDID}>
 *       Resolve DID
 *     </button>
 *   );
 * }
 * ```
 * 
 */
export function useCastor(resolvers: ExtraResolver[] = []) {
    const apollo = useApollo();
    const castor = useMemo(() => new SDK.Castor(apollo, resolvers), [apollo, resolvers]);
    return castor;
}

/**
 * Hook for accessing Prism DID context and operations.
 * 
 * Prism DIDs are anchored on the Cardano blockchain and provide long-term, 
 * verifiable identity. This hook must be used within a PrismDIDProvider.
 * 
 * @returns {Object} Prism DID context containing:
 *   - `prismDID`: Current Prism DID instance or null if not created yet
 *   - `create`: Async function to create a new Prism DID with given alias
 * @returns {SDK.Domain.DID | null} returns.prismDID - The current Prism DID instance
 * @returns {(alias: string) => Promise<void>} returns.create - Function to create new Prism DID
 * @throws {Error} When used outside of PrismDIDProvider
 * 
 * @example
 * ```tsx
 * import { usePrismDID } from '@trust0/identus-react/hooks';
 * 
 * function PrismDIDComponent() {
 *   const { prismDID, create } = usePrismDID();
 *   
 *   const handleCreateDID = async () => {
 *     try {
 *       await create('my-prism-identity');
 *       console.log('Prism DID created successfully');
 *     } catch (error) {
 *       console.error('Failed to create Prism DID:', error);
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       {prismDID ? (
 *         <p>Current Prism DID: {prismDID.toString()}</p>
 *       ) : (
 *         <button onClick={handleCreateDID}>Create Prism DID</button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export function usePrismDID() {
    const context = useContext(PrismDIDContext);
    if (!context) {
        throw new Error('usePrismDID must be used within a PrismDIDProvider');
    }
    return context;
}

/**
 * Creates and returns a memoized Pluto instance for persistent storage operations.
 * 
 * Pluto is the storage layer of the Identus SDK that handles persistence of credentials,
 * DIDs, keys, and other identity-related data. It supports multiple storage backends.
 * 
 * @param storageType - Storage backend to use (defaults to IndexedDB)
 * @returns {SDK.Domain.Pluto} A memoized Pluto instance configured with the specified storage
 *
 */
export function usePluto(storageType: typeof BaseStorage | StorageType = StorageType.IndexDB) {
    const {db} = useRIDB<typeof schemas>()
    const store = useMemo(() => createStore({ db, storageType }), [db])
    const apollo = useApollo()
    const pluto = useMemo(() => new SDK.Pluto(store, apollo), [store, apollo])
    return pluto;
}

/**
 * Hook for accessing Peer DID context and operations.
 * 
 * Peer DIDs are ephemeral, off-ledger DIDs used for direct peer-to-peer communication.
 * They're created quickly and don't require blockchain anchoring. This hook must be used
 * within a PeerDIDProvider.
 * 
 * @returns {Object} Peer DID context containing:
 *   - `peerDID`: Current Peer DID instance or null if not created yet
 *   - `create`: Async function to create a new ephemeral Peer DID for communication
 * @returns {SDK.Domain.DID | null} returns.peerDID - The current Peer DID instance
 * @returns {() => Promise<void>} returns.create - Function to create new Peer DID
 * 
 * @throws {Error} When used outside of PeerDIDProvider
 * 
 * @example
 * ```tsx
 * import { usePeerDID } from '@trust0/identus-react/hooks';
 * 
 * function PeerDIDComponent() {
 *   const { peerDID, create } = usePeerDID();
 *   
 *   const handleCreatePeerDID = async () => {
 *     try {
 *       await create();
 *       console.log('Peer DID created for communication');
 *     } catch (error) {
 *       console.error('Failed to create Peer DID:', error);
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       {peerDID ? (
 *         <div>
 *           <p>Peer DID: {peerDID.toString()}</p>
 *           <p>Ready for peer-to-peer communication</p>
 *         </div>
 *       ) : (
 *         <button onClick={handleCreatePeerDID}>
 *           Create Peer DID
 *         </button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 */
export function usePeerDID() {
    const context = useContext(PeerDIDContext);
    if (!context) {
        throw new Error('usePeerDID must be used within a PeerDIDProvider');
    }
    return context;
}

/**
 * Hook for accessing the main Identus Agent context and operations.
 * 
 * The Agent is the central component that orchestrates all Identus SDK operations
 * including DIDComm messaging, credential operations, and connection management.
 * This hook must be used within an AgentProvider.
 * 
 * @returns {Object} Agent context containing:
 *   - `agent`: Current Agent instance or null if not initialized
 *   - `start`: Async function to start the agent and begin operations
 *   - `stop`: Async function to stop the agent and cleanup resources  
 *   - `state`: Current agent state string (stopped, starting, running, etc.)
 *   - `setAgent`: Function to manually set a new agent instance
 * @returns {SDK.Agent | null} returns.agent - The current Agent instance
 * @returns {() => Promise<void>} returns.start - Function to start the agent
 * @returns {() => Promise<void>} returns.stop - Function to stop the agent
 * @returns {string} returns.state - Current agent state
 * @returns {(agent: SDK.Agent) => void} returns.setAgent - Function to set agent instance
 * 
 * @throws {Error} When used outside of AgentProvider
 * 
 * @example
 * ```tsx
 * import { useAgent } from '@trust0/identus-react/hooks';
 * 
 * function AgentController() {
 *   const { agent, start, stop, state, setAgent } = useAgent();
 *   
 *   const handleStart = async () => {
 *     try {
 *       await start();
 *       console.log('Agent started successfully');
 *     } catch (error) {
 *       console.error('Failed to start agent:', error);
 *     }
 *   };
 *   
 *   const handleStop = async () => {
 *     try {
 *       await stop();
 *       console.log('Agent stopped successfully');
 *     } catch (error) {
 *       console.error('Failed to stop agent:', error);
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       <p>Agent State: {state}</p>
 *       <div>
 *         <button onClick={handleStart} disabled={state === 'running'}>
 *           Start Agent
 *         </button>
 *         <button onClick={handleStop} disabled={state === 'stopped'}>
 *           Stop Agent
 *         </button>
 *       </div>
 *       {agent && <p>Agent ID: {agent.getCurrentDID()?.toString()}</p>}
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export function useAgent() {
    const context = useContext(AgentContext);
    if (!context) {
        throw new Error('useAgent must be used within a AgentProvider');
    }
    return context;
}

/**
 * Hook for accessing credential issuance context and operations.
 * 
 * Provides functionality for creating and issuing verifiable credentials to holders.
 * This hook must be used within an IssuerProvider and requires a running agent.
 * 
 * @returns {Object} Issuer context containing:
 *   - `agent`: Current Agent instance or null if not running
 *   - `start`: Async function to start the agent for issuing operations
 *   - `stop`: Async function to stop the agent
 *   - `state`: Current agent state string
 *   - `createOOBOffer`: Create out-of-band credential offer for holders
 *   - `issueCredential`: Issue a verifiable credential to a specific holder
 * @returns {SDK.Agent | null} returns.agent - The current Agent instance
 * @returns {() => Promise<void>} returns.start - Function to start the agent
 * @returns {() => Promise<void>} returns.stop - Function to stop the agent
 * @returns {string} returns.state - Current agent state
 * @returns {(type: SDK.Domain.CredentialType, credentialId: string, claims: Record<string, any>) => Promise<string>} returns.createOOBOffer - Create credential offer
 * @returns {(credentialId: string, holder: SDK.Domain.DID) => Promise<void>} returns.issueCredential - Issue credential to holder
 * 
 * @throws {Error} When used outside of IssuerProvider
 * 
 */
export function useIssuer() {
    const context = useContext(IssuerContext);
    if (!context) {
        throw new Error('useIssuer must be used within a IssuerProvider');
    }
    return context;
}

/**
 * Hook for accessing credential holder context and operations.
 * 
 * Provides functionality for receiving, storing, and presenting verifiable credentials.
 * This hook must be used within a HolderProvider and requires a running agent.
 * 
 * @returns {Object} Holder context containing:
 *   - `agent`: Current Agent instance or null if not running
 *   - `start`: Async function to start the agent for holder operations
 *   - `stop`: Async function to stop the agent
 *   - `state`: Current agent state string
 *   - `parseOOBOffer`: Parse and validate out-of-band credential offers
 *   - `acceptOOBOffer`: Accept and store offered credentials in wallet
 *   - `handlePresentationRequest`: Respond to verifier presentation requests
 * @returns {SDK.Agent | null} returns.agent - The current Agent instance
 * @returns {() => Promise<void>} returns.start - Function to start the agent
 * @returns {() => Promise<void>} returns.stop - Function to stop the agent
 * @returns {string} returns.state - Current agent state
 * @returns {(offerUrl: string, peerDID: SDK.Domain.DID) => Promise<SDK.Domain.Message>} returns.parseOOBOffer - Parse credential offer
 * @returns {(message: SDK.Domain.Message) => Promise<void>} returns.acceptOOBOffer - Accept credential offer
 * @returns {(request: SDK.Domain.Message, credential: SDK.Domain.Credential) => Promise<void>} returns.handlePresentationRequest - Handle presentation request
 * 
 * @throws {Error} When used outside of HolderProvider
 * 
 */
export function useHolder() {
    const context = useContext(HolderContext);
    if (!context) {
        throw new Error('useHolder must be used within a HolderProvider');
    }
    return context;
}

/**
 * Hook for accessing credential verification context and operations.
 * 
 * Provides functionality for requesting and verifying credential presentations
 * from holders. This hook must be used within a VerifierProvider and requires a running agent.
 * 
 * @returns {Object} Verifier context containing:
 *   - `agent`: Current Agent instance or null if not running
 *   - `start`: Async function to start the agent for verification operations
 *   - `stop`: Async function to stop the agent
 *   - `state`: Current agent state string
 *   - `issuePresentationRequest`: Send presentation requests to credential holders
 *   - `verifyPresentation`: Verify and validate received credential presentations
 * @returns {SDK.Agent | null} returns.agent - The current Agent instance
 * @returns {() => Promise<void>} returns.start - Function to start the agent
 * @returns {() => Promise<void>} returns.stop - Function to stop the agent
 * @returns {string} returns.state - Current agent state
 * @returns {(type: SDK.Domain.CredentialType, holderDID: SDK.Domain.DID, requirements: Record<string, any>) => Promise<void>} returns.issuePresentationRequest - Request presentation from holder
 * @returns {(presentation: SDK.Domain.Message) => Promise<boolean>} returns.verifyPresentation - Verify credential presentation
 * 
 * @throws {Error} When used outside of VerifierProvider
 * 
 */
export function useVerifier() {
    const context = useContext(VerifierContext);
    if (!context) {
        throw new Error('useVerifier must be used within a VerifierProvider');
    }
    return context;
}

/**
 * Hook for accessing DIDComm message context and operations.
 * 
 * Provides functionality for managing DIDComm messages including reading, deleting,
 * and filtering messages by type. This hook must be used within a MessagesProvider.
 * 
 * @returns {Object} Messages context containing:
 *   - `messages`: Array of all messages with their read status metadata
 *   - `receivedMessages`: Filtered array containing only received messages
 *   - `sentMessages`: Filtered array containing only sent messages
 *   - `unreadMessages`: Filtered array containing only unread messages
 *   - `readMessage`: Async function to mark a specific message as read
 *   - `deleteMessage`: Async function to permanently delete a message
 *   - `getMessages`: Async function to refresh and reload messages from storage
 * @returns {Array<{message: SDK.Domain.Message, read: boolean}>} returns.messages - All messages with read status
 * @returns {Array<{message: SDK.Domain.Message, read: boolean}>} returns.receivedMessages - Received messages only
 * @returns {Array<{message: SDK.Domain.Message, read: boolean}>} returns.sentMessages - Sent messages only
 * @returns {Array<{message: SDK.Domain.Message, read: boolean}>} returns.unreadMessages - Unread messages only
 * @returns {(message: SDK.Domain.Message) => Promise<void>} returns.readMessage - Mark message as read
 * @returns {(message: SDK.Domain.Message) => Promise<void>} returns.deleteMessage - Delete message
 * @returns {() => Promise<void>} returns.getMessages - Refresh messages from storage
 * 
 * @throws {Error} When used outside of MessagesProvider
 * 
 * @example
 * ```tsx
 * import { useMessages } from '@trust0/identus-react/hooks';
 * 
 * function MessageInbox() {
 *   const { 
 *     messages, 
 *     unreadMessages, 
 *     readMessage, 
 *     deleteMessage,
 *     getMessages 
 *   } = useMessages();
 *   
 *   const handleReadMessage = async (message) => {
 *     try {
 *       await readMessage(message);
 *       console.log('Message marked as read');
 *     } catch (error) {
 *       console.error('Failed to mark message as read:', error);
 *     }
 *   };
 *   
 *   const handleDeleteMessage = async (message) => {
 *     try {
 *       await deleteMessage(message);
 *       console.log('Message deleted');
 *     } catch (error) {
 *       console.error('Failed to delete message:', error);
 *     }
 *   };
 *   
 *   const refreshMessages = async () => {
 *     try {
 *       await getMessages();
 *       console.log('Messages refreshed');
 *     } catch (error) {
 *       console.error('Failed to refresh messages:', error);
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       <h3>Messages ({messages.length})</h3>
 *       <p>Unread: {unreadMessages.length}</p>
 *       
 *       <button onClick={refreshMessages}>Refresh</button>
 *       
 *       {messages.map((item, index) => (
 *         <div key={index} className={!item.read ? 'unread' : ''}>
 *           <p>From: {item.message.from?.toString()}</p>
 *           <p>Type: {item.message.piuri}</p>
 *           <button onClick={() => handleReadMessage(item.message)}>
 *             Mark as Read
 *           </button>
 *           <button onClick={() => handleDeleteMessage(item.message)}>
 *             Delete
 *           </button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export function useMessages() {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessagesProvider');
    }
    return context;
}

/**
 * Hook for accessing credential storage context and operations.
 * 
 * Provides functionality for managing stored verifiable credentials including
 * retrieval, deletion, and refresh operations. This hook must be used within
 * a CredentialsProvider.
 * 
 * @returns {Object} Credentials context containing:
 *   - `credentials`: Array of all stored verifiable credentials
 *   - `deleteCredential`: Async function to permanently delete a credential
 *   - `fetchCredentials`: Async function to refresh credentials from storage
 * @returns {Array<SDK.Domain.Credential>} returns.credentials - All stored credentials
 * @returns {(credential: SDK.Domain.Credential) => Promise<void>} returns.deleteCredential - Delete credential from storage
 * @returns {() => Promise<void>} returns.fetchCredentials - Refresh credentials from storage
 * 
 * @throws {Error} When used outside of CredentialsProvider
 * 
 * @example
 * ```tsx
 * import { useCredentials } from '@trust0/identus-react/hooks';
 * 
 * function CredentialWallet() {
 *   const { credentials, deleteCredential, fetchCredentials } = useCredentials();
 *   
 *   const handleDeleteCredential = async (credential) => {
 *     if (window.confirm('Are you sure you want to delete this credential?')) {
 *       try {
 *         await deleteCredential(credential);
 *         console.log('Credential deleted successfully');
 *       } catch (error) {
 *         console.error('Failed to delete credential:', error);
 *       }
 *     }
 *   };
 *   
 *   const refreshCredentials = async () => {
 *     try {
 *       await fetchCredentials();
 *       console.log('Credentials refreshed');
 *     } catch (error) {
 *       console.error('Failed to refresh credentials:', error);
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       <h3>My Credentials ({credentials.length})</h3>
 *       <button onClick={refreshCredentials}>Refresh</button>
 *       
 *       {credentials.map((credential, index) => (
 *         <div key={index} className="credential-card">
 *           <h4>{credential.claims.name || 'Unnamed Credential'}</h4>
 *           <p>Issuer: {credential.issuer}</p>
 *           <p>Type: {credential.credentialType}</p>
 *           <p>ID: {credential.id}</p>
 *           
 *           <button 
 *             onClick={() => handleDeleteCredential(credential)}
 *             className="delete-button"
 *           >
 *             Delete
 *           </button>
 *         </div>
 *       ))}
 *       
 *       {credentials.length === 0 && (
 *         <p>No credentials stored. Accept a credential offer to get started.</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export function useCredentials() {
    const context = useContext(CredentialsContext);
    if (!context) {
        throw new Error('useCredentials must be used within a CredentialsProvider');
    }
    return context;
}

/**
 * Hook for accessing DID connection context and operations.
 * 
 * Provides functionality for managing established DID connections (relationships
 * between DIDs) including viewing and deleting connections. This hook must be
 * used within a ConnectionsProvider.
 * 
 * @returns {Object} Connections context containing:
 *   - `connections`: Array of all established DID-to-DID connections
 *   - `deleteConnection`: Async function to permanently delete a connection
 * @returns {Array<SDK.Domain.DIDPair>} returns.connections - All established DID connections
 * @returns {(connection: SDK.Domain.DIDPair) => Promise<void>} returns.deleteConnection - Delete connection from storage
 * 
 * @throws {Error} When used outside of ConnectionsProvider
 * 
 * @example
 * ```tsx
 * import { useConnections } from '@trust0/identus-react/hooks';
 * 
 * function ConnectionManager() {
 *   const { connections, deleteConnection } = useConnections();
 *   
 *   const handleDeleteConnection = async (connection) => {
 *     if (window.confirm('Are you sure you want to delete this connection?')) {
 *       try {
 *         await deleteConnection(connection);
 *         console.log('Connection deleted successfully');
 *       } catch (error) {
 *         console.error('Failed to delete connection:', error);
 *       }
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       <h3>My Connections ({connections.length})</h3>
 *       
 *       {connections.map((connection, index) => (
 *         <div key={index} className="connection-card">
 *           <h4>Connection {index + 1}</h4>
 *           <p>Host: {connection.host.toString()}</p>
 *           <p>Receiver: {connection.receiver.toString()}</p>
 *           <p>Name: {connection.name || 'Unnamed Connection'}</p>
 *           
 *           <button 
 *             onClick={() => handleDeleteConnection(connection)}
 *             className="delete-button"
 *           >
 *             Delete Connection
 *           </button>
 *         </div>
 *       ))}
 *       
 *       {connections.length === 0 && (
 *         <p>No connections established. Create a connection to get started.</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export function useConnections() {
    const context = useContext(ConnectionsContext);
    if (!context) {
        throw new Error('useConnections must be used within a ConnectionsProvider');
    }
    return context;
}

/**
 * Hook for accessing database context and operations.
 * 
 * Provides comprehensive database functionality including DID management, message handling,
 * credential storage, and application settings. This hook must be used within a DatabaseProvider.
 * 
 * @returns {Object} Database context containing extensive database operations and state management:
 *   - `db`: Database instance for direct operations
 *   - `state`: Current database state (loading, loaded, error, etc.)
 *   - `error`: Current error state if any database operations failed
 *   - `start`: Initialize database with configuration
 *   - `getExtendedDIDs`: Retrieve all stored DIDs with metadata
 *   - `storeDID`: Store a DID with optional metadata
 *   - `getMessages`: Retrieve all stored DIDComm messages
 *   - `getSeed`: Get the wallet seed for key derivation
 *   - `setSeed`: Store the wallet seed securely
 * @returns {Object} returns.db - Direct database instance for advanced operations
 * @returns {string} returns.state - Current database state
 * @returns {Error | null} returns.error - Current error if database operations failed
 * @returns {(config: {name: string, storageType: StorageType, schemas: any}) => Promise<void>} returns.start - Initialize database
 * @returns {() => Promise<Array<SDK.Domain.DID>>} returns.getExtendedDIDs - Get all stored DIDs
 * @returns {(did: SDK.Domain.DID, metadata?: any) => Promise<void>} returns.storeDID - Store DID with metadata
 * @returns {() => Promise<Array<SDK.Domain.Message>>} returns.getMessages - Get all stored messages
 * @returns {() => Promise<SDK.Domain.Seed | null>} returns.getSeed - Get wallet seed
 * @returns {(seed: SDK.Domain.Seed) => Promise<void>} returns.setSeed - Store wallet seed
 * 
 * @throws {Error} When used outside of DatabaseProvider
 * 
 */
export function useDatabase() {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
}
