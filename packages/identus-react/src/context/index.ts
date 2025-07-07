/**
 * @packageDocumentation
 * 
 * @module 
 * @mergeModuleWith <project>
 */ 

import SDK from "@hyperledger/identus-sdk";
import { RIDB, StartOptions } from "@trust0/ridb";
import { Doc } from "@trust0/ridb-core";
import { createContext } from "react";
import { schemas } from "../db";
import { useDatabase } from "../hooks";

type UseDatabase = ReturnType<typeof useDatabase>;
type IssuanceFlow = Awaited<ReturnType<UseDatabase["getIssuanceFlow"]>>;
type Request = IssuanceFlow extends infer T ? T extends null ? never : T : never;


/**
 * React context for managing Prism DID operations and state.
 * 
 * Prism DIDs are long-lived, blockchain-anchored identifiers that provide
 * persistent, verifiable identity on the Cardano network. This context manages
 * the creation and state of Prism DIDs within the application.
 * 
 * @example
 * ```tsx
 * import { PrismDIDContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * 
 * function PrismDIDManager() {
 *   const context = useContext(PrismDIDContext);
 *   
 *   if (!context) {
 *     throw new Error('PrismDIDManager must be used within PrismDIDProvider');
 *   }
 *   
 *   const { prismDID, create } = context;
 *   
 *   const handleCreateDID = async () => {
 *     await create('my-main-identity');
 *   };
 *   
 *   return (
 *     <div>
 *       {prismDID ? (
 *         <p>Prism DID: {prismDID.toString()}</p>
 *       ) : (
 *         <button onClick={handleCreateDID}>Create Prism DID</button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export const PrismDIDContext = createContext<{
    /** Current Prism DID instance, null if not yet created */
    prismDID: SDK.Domain.DID | null;
    /** Function to create a new Prism DID with an alias */
    create: (alias: string) => Promise<SDK.Domain.DID>;
} | undefined>(undefined);

/**
 * React context for managing Peer DID operations and state.
 * 
 * Peer DIDs are ephemeral, off-ledger identifiers used for direct peer-to-peer
 * communication. They can be created quickly without blockchain interaction
 * and are ideal for secure messaging between parties.
 * 
 * @example
 * ```tsx
 * import { PeerDIDContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * 
 * function PeerDIDManager() {
 *   const context = useContext(PeerDIDContext);
 *   
 *   if (!context) {
 *     throw new Error('PeerDIDManager must be used within PeerDIDProvider');
 *   }
 *   
 *   const { peerDID, create } = context;
 *   
 *   const handleCreatePeerDID = async () => {
 *     await create();
 *   };
 *   
 *   return (
 *     <div>
 *       {peerDID ? (
 *         <div>
 *           <p>Peer DID: {peerDID.toString()}</p>
 *           <p>Ready for secure messaging</p>
 *         </div>
 *       ) : (
 *         <button onClick={handleCreatePeerDID}>Create Peer DID</button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export const PeerDIDContext = createContext<{
    /** Current Peer DID instance, null if not yet created */
    peerDID: SDK.Domain.DID | null;
    /** Function to create a new Peer DID */
    create: () => Promise<SDK.Domain.DID>;
} | undefined>(undefined);

/**
 * Enumeration of possible database connection states.
 * 
 */
export type DatabaseState = 'disconnected' | 'loading' | 'loaded' | 'error';

/**
 * Type definition for DID with extended metadata including alias and keys.
 * 
 */
export type DIDAlias = {
    /** The DID instance */
    did: SDK.Domain.DID;
    /** Optional human-readable alias for the DID */
    alias?: string;
    /** Current status of the DID (e.g., 'active', 'published', 'deactivated') */
    status: string;
    /** Associated private keys for the DID */
    keys: SDK.Domain.PrivateKey[];
}

/**
 * Type definition for DIDs grouped by their status or type.
 * 
 */
export type GroupedDIDs = Record<string, DIDAlias[]>;


export type AgentContextType = {
    agent: SDK.Agent | null;
    /** Function to start the agent */
    start: () => Promise<void>;
    /** Function to stop the agent */
    stop: () => Promise<void>;
    /** Current state of the agent
     * [SDK.Domain.Startable.State](https://github.com/hyperledger-identus/sdk-ts/blob/main/docs/sdk/modules/Domain.Protocols.Startable.md)
     */
    state: SDK.Domain.Startable.State;
}

/**
 * React context for comprehensive database operations and state management.
 * 
 * This context provides access to all database-related functionality including
 * DID management, message handling, credential storage, issuance flows, and
 * application settings. It serves as the central data layer for the identity wallet.
 * 
 * @example
 * ```tsx
 * import { DatabaseContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * import { StorageType } from '@trust0/ridb';
 * 
 * function DatabaseManager() {
 *   const context = useContext(DatabaseContext);
 *   
 *   if (!context) {
 *     throw new Error('DatabaseManager must be used within DatabaseProvider');
 *   }
 *   
 *   const { db, state, start, getExtendedDIDs, getSeed } = context;
 *   
 *   const initializeDatabase = async () => {
 *     await start({
 *       name: 'my-wallet',
 *       storageType: StorageType.IndexDB,
 *       schemas: schemas
 *     });
 *   };
 *   
 *   const loadWalletData = async () => {
 *     const dids = await getExtendedDIDs();
 *     const seed = await getSeed();
 *     console.log('DIDs:', dids.length, 'Seed exists:', !!seed);
 *   };
 *   
 *   return (
 *     <div>
 *       <p>Database State: {state}</p>
 *       <button onClick={initializeDatabase}>Initialize</button>
 *       <button onClick={loadWalletData}>Load Data</button>
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export const DatabaseContext = createContext<{
    /** RIDB database instance */
    db: RIDB<typeof schemas>;
    /** Current database connection state */
    state: DatabaseState;
    /** Current error, if any */
    error: Error | null;
    /** Available database features */
    features: string[];
    /** Current wallet identifier */
    wallet: string | null;
    /** Pluto storage instance */
    pluto: SDK.Domain.Pluto;
    /** Function to start/initialize the database */
    start: (options: StartOptions<typeof schemas>) => Promise<void>;
    /** Retrieve all messages with read status */
    getMessages: () => Promise<{ message: SDK.Domain.Message, read: boolean }[]>;
    /** Mark a message as read */
    readMessage: (message: SDK.Domain.Message) => Promise<void>;
    /** Delete a message */
    deleteMessage: (message: SDK.Domain.Message) => Promise<void>;
    /** Get all DIDs with extended metadata */
    getExtendedDIDs: () => Promise<{ did: SDK.Domain.DID, status: string, alias?: string, keys: SDK.Domain.PrivateKey[] }[]>;
    /** Store a DID with associated keys and alias */
    storeDID: (did: SDK.Domain.DID, keys: SDK.Domain.PrivateKey[], alias: string) => Promise<void>;
    /** Update the status of a DID */
    updateDIDStatus: (did: SDK.Domain.DID, status: string) => Promise<void>;
    /** Get all issuance flows */
    getIssuanceFlows: () => Promise<Doc<typeof schemas["issuance"]>[]>;
    /** Get a specific issuance flow by ID */
    getIssuanceFlow: (id: string) => Promise<Doc<typeof schemas["issuance"]> | null>;
    /** Create a new issuance flow */
    createIssuanceFlow: (issuanceFlow: Doc<typeof schemas["issuance"]>) => Promise<void>;
    /** Update an existing issuance flow */
    updateIssuanceFlow: (issuanceFlow: Doc<typeof schemas["issuance"]>) => Promise<void>;
    /** Delete an issuance flow */
    deleteIssuanceFlow: (id: string) => Promise<void>;
    /** Get application setting by key */
    getSettingsByKey: (key: string) => Promise<string | null>;
    /** Store application setting by key */
    storeSettingsByKey: (key: string, value: string) => Promise<void>;
    /** Delete application setting by key */
    deleteSettingsByKey: (key: string) => Promise<void>;
    /** Get DIDs grouped by status/type */
    getGroupedDIDs: () => Promise<GroupedDIDs>,
    /** Load available database features */
    getFeatures: () => Promise<void>;
    /** Get current mediator DID */
    getMediator: () => Promise<SDK.Domain.DID | null>;
    /** Get wallet seed */
    getSeed: () => Promise<SDK.Domain.Seed | null>;
    /** Get wallet identifier */
    getWallet: () => Promise<string | null>;
    /** Get DID resolver URL */
    getResolverUrl: () => Promise<string | null>;
    /** Set mediator DID */
    setMediator: (mediator: SDK.Domain.DID | null) => Promise<void>;
    /** Set wallet seed */
    setSeed: (seed: SDK.Domain.Seed) => Promise<SDK.Domain.Seed>;
    /** Set wallet identifier */
    setWallet: (wallet: string | null) => Promise<void>;
    /** Set DID resolver URL */
    setResolverUrl: (resolverUrl: string | null) => Promise<void>;
} | undefined>(undefined);

/**
 * React context for managing the main Identus Agent operations.
 * 
 * The Agent is the central orchestrator for all Identus SDK operations including
 * DIDComm messaging, credential operations, and connection management. This context
 * provides access to agent lifecycle management and core functionality.
 * 
 * @example
 * ```tsx
 * import { AgentContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * 
 * function AgentManager() {
 *   const context = useContext(AgentContext);
 *   
 *   if (!context) {
 *     throw new Error('AgentManager must be used within AgentProvider');
 *   }
 *   
 *   const { agent, start, stop, state, setAgent } = context;
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
 *   return (
 *     <div>
 *       <p>Agent State: {state}</p>
 *       <button onClick={handleStart} disabled={state === 'running'}>
 *         Start Agent
 *       </button>
 *       <button onClick={stop} disabled={state !== 'running'}>
 *         Stop Agent
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export const AgentContext = createContext<{
    /** Current Agent instance or null if not initialized */
    agent: SDK.Agent | null;
    /** Function to start the agent and begin operations */
    start: () => Promise<void>;
    /** Function to stop the agent and cleanup resources */
    stop: () => Promise<void>;
    /** Current agent state (stopped, starting, running, etc.) */
    state: SDK.Domain.Startable.State;
    /** Function to manually set a new agent instance */
    setAgent: (agent: SDK.Agent) => void;
} | undefined>(undefined);

/**
 * React context for credential issuance operations.
 * 
 * Provides functionality for creating and issuing verifiable credentials to holders.
 * Includes support for out-of-band credential offers and direct credential issuance.
 * 
 * @example
 * ```tsx
 * import { IssuerContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * import SDK from '@hyperledger/identus-sdk';
 * 
 * function CredentialIssuer() {
 *   const context = useContext(IssuerContext);
 *   
 *   if (!context) {
 *     throw new Error('CredentialIssuer must be used within IssuerProvider');
 *   }
 *   
 *   const { createOOBOffer, issueCredential, state } = context;
 *   
 *   const createDriversLicenseOffer = async () => {
 *     const offer = await createOOBOffer(
 *       SDK.Domain.CredentialType.JWT,
 *       'drivers-license-123',
 *       {
 *         name: 'John Doe',
 *         licenseNumber: 'DL123456',
 *         expirationDate: '2025-12-31'
 *       }
 *     );
 *     
 *     // Share offer with holder
 *     console.log('Credential offer:', offer);
 *   };
 *   
 *   return (
 *     <div>
 *       <p>Issuer State: {state}</p>
 *       <button onClick={createDriversLicenseOffer}>
 *         Create Driver's License Offer
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export const IssuerContext = createContext<AgentContextType & {
    /**
     * Get the status of an issuance flow.
     * 
     * @param request - Issuance flow request
     * @returns Status of the issuance flow
     */
    getIssuanceStatus(request: Request): "completed" | "accept-pending" | "pending";
    /**
     * Get the OOB URL for an issuance flow.
     * 
     * @param request - Issuance flow request
     * @returns Promise resolving to the OOB URL or null if no request is available
     */
    getOOBURL(request: Request): Promise<string | null>;
    /**
     * Create an out-of-band credential offer.
     * 
     * @param type - Type of credential to offer
     * @param id - Unique identifier for the credential
     * @param claims - Claims to include in the credential
     * @returns Promise resolving to the offer URL/string
     */
    createOOBOffer<T extends SDK.Domain.CredentialType>(
        type: T,
        id: string,
        claims: SDK.Domain.PresentationClaims<T>
    ): Promise<string>;
    /**
     * Issue a credential directly to a holder.
     * 
     * @param type - Type of credential to issue
     * @param message - DIDComm message context
     * @param claims - Claims to include in the credential
     * @param issuerDID - DID of the issuer
     * @param holderDID - DID of the holder
     */
    issueCredential<T extends SDK.Domain.CredentialType>(
        type: T,
        message: SDK.Domain.Message,
        claims: SDK.Domain.PresentationClaims<T>,
        issuerDID: SDK.Domain.DID,
        holderDID: SDK.Domain.DID,
    ): Promise<void>;
} | undefined>(undefined);

/**
 * React context for credential verification operations.
 * 
 * Provides functionality for requesting and verifying credential presentations
 * from holders. Supports presentation requests and verification of received
 * credential presentations.
 * 
 * @example
 * ```tsx
 * import { VerifierContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * import SDK from '@hyperledger/identus-sdk';
 * 
 * function CredentialVerifier() {
 *   const context = useContext(VerifierContext);
 *   
 *   if (!context) {
 *     throw new Error('CredentialVerifier must be used within VerifierProvider');
 *   }
 *   
 *   const { issuePresentationRequest, verifyPresentation } = context;
 *   
 *   const requestAgeVerification = async (holderDID: SDK.Domain.DID) => {
 *     await issuePresentationRequest(
 *       SDK.Domain.CredentialType.JWT,
 *       holderDID,
 *       { age: { min: 21 } }
 *     );
 *   };
 *   
 *   const verifyAgePresentation = async (presentation: SDK.Domain.Message) => {
 *     const isValid = await verifyPresentation(presentation);
 *     console.log('Age verification result:', isValid);
 *   };
 *   
 *   return (
 *     <div>
 *       <button onClick={() => requestAgeVerification(holderDID)}>
 *         Request Age Verification
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export const VerifierContext = createContext<AgentContextType & {
    /**
     * Issue a presentation request to a holder.
     * 
     * @param type - Type of credential being requested
     * @param toDID - DID of the holder to request from
     * @param claims - Claims being requested
     */
    issuePresentationRequest<T extends SDK.Domain.CredentialType>(
        type: SDK.Domain.CredentialType,
        toDID: SDK.Domain.DID,
        claims: SDK.Domain.PresentationClaims<T>
    ): Promise<void>;
    /**
     * Verify a received presentation.
     * 
     * @param presentation - Presentation message to verify
     * @returns Promise resolving to verification result
     */
    verifyPresentation(
        presentation: SDK.Domain.Message,
    ): Promise<boolean>;
} | undefined>(undefined);

/**
 * React context for credential holder operations.
 * 
 * Provides functionality for receiving, storing, and presenting verifiable credentials.
 * Includes support for parsing credential offers, accepting credentials, and responding
 * to presentation requests.
 * 
 * @example
 * ```tsx
 * import { HolderContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * 
 * function CredentialHolder() {
 *   const context = useContext(HolderContext);
 *   
 *   if (!context) {
 *     throw new Error('CredentialHolder must be used within HolderProvider');
 *   }
 *   
 *   const { parseOOBOffer, acceptOOBOffer, handlePresentationRequest } = context;
 *   
 *   const acceptCredentialOffer = async (offerUrl: string, peerDID: SDK.Domain.DID) => {
 *     try {
 *       // Parse the offer
 *       const message = await parseOOBOffer(offerUrl, peerDID);
 *       
 *       // Accept and store the credential
 *       await acceptOOBOffer(message);
 *       
 *       console.log('Credential accepted and stored');
 *     } catch (error) {
 *       console.error('Failed to accept credential:', error);
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       <button onClick={() => acceptCredentialOffer(offerUrl, myPeerDID)}>
 *         Accept Credential Offer
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 * 
 */
export const HolderContext = createContext<AgentContextType & {
    /**
     * Parse an out-of-band credential offer.
     * 
     * @param offer - Credential offer URL or string
     * @param selfPeerDID - Holder's peer DID for communication
     * @returns Promise resolving to parsed message
     */
    parseOOBOffer(
        url: string,
    ): Promise<SDK.Domain.Message>;
    /**
     * Accept an out-of-band credential offer.
     * 
     * @param message - Parsed offer message
     */
    acceptOOBOffer(
        message: SDK.Domain.Message,
    ): Promise<void>;

    /**
     * Accept an issued credential.
     * 
     * @param message - Issued credential message
     */
    acceptIssuedCredential(
        message: SDK.Domain.Message,
    ): Promise<SDK.Domain.Credential>;

    /**
     * Handle a presentation request by providing a credential.
     * 
     * @param message - Presentation request message
     * @param credential - Credential to present
     */
    handlePresentationRequest(
        message: SDK.Domain.Message,
        credential: SDK.Domain.Credential,
    ): Promise<void>;
} | undefined>(undefined);

/**
 * React context for DIDComm message management.
 * 
 * Provides comprehensive functionality for managing DIDComm messages including
 * reading, deleting, and organizing messages by type and status. Essential for
 * handling communication between identity entities.
 * 
 * @example
 * ```tsx
 * import { MessagesContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * 
 * function MessageInbox() {
 *   const context = useContext(MessagesContext);
 *   
 *   if (!context) {
 *     throw new Error('MessageInbox must be used within MessagesProvider');
 *   }
 *   
 *   const { 
 *     messages, 
 *     unreadMessages, 
 *     readMessage, 
 *     deleteMessage 
 *   } = context;
 *   
 *   const markAsRead = async (message: SDK.Domain.Message) => {
 *     await readMessage(message);
 *   };
 *   
 *   const removeMessage = async (message: SDK.Domain.Message) => {
 *     await deleteMessage(message);
 *   };
 *   
 *   return (
 *     <div>
 *       <h3>Messages ({messages.length})</h3>
 *       <p>Unread: {unreadMessages.length}</p>
 *       
 *       {messages.map((item, index) => (
 *         <div key={index} className={!item.read ? 'unread' : ''}>
 *           <p>From: {item.message.from?.toString()}</p>
 *           <p>Type: {item.message.piuri}</p>
 *           <button onClick={() => markAsRead(item.message)}>
 *             Mark as Read
 *           </button>
 *           <button onClick={() => removeMessage(item.message)}>
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
export const MessagesContext = createContext<{
    /** Array of all messages with their read status */
    messages: { message: SDK.Domain.Message, read: boolean }[];
    /** Array of received messages only */
    receivedMessages: SDK.Domain.Message[];
    /** Array of sent messages only */
    sentMessages: SDK.Domain.Message[];
    /** Array of unread messages only */
    unreadMessages: SDK.Domain.Message[];
    /** Function to mark a message as read */
    readMessage: (message: SDK.Domain.Message) => Promise<void>;
    /** Function to delete a message */
    deleteMessage: (message: SDK.Domain.Message) => Promise<void>;
    /** Function to refresh messages from storage */
    getMessages: (piuri?: string) => Promise<{ message: SDK.Domain.Message, read: boolean }[]>;
} | undefined>(undefined);

/**
 * React context for credential storage and management.
 * 
 * Provides functionality for managing stored verifiable credentials including
 * retrieval, deletion, and refresh operations. Central to the credential wallet
 * functionality.
 * 
 * @example
 * ```tsx
 * import { CredentialsContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * 
 * function CredentialWallet() {
 *   const context = useContext(CredentialsContext);
 *   
 *   if (!context) {
 *     throw new Error('CredentialWallet must be used within CredentialsProvider');
 *   }
 *   
 *   const { credentials, deleteCredential, fetchCredentials } = context;
 *   
 *   const removeCredential = async (credential: SDK.Domain.Credential) => {
 *     if (confirm('Delete this credential?')) {
 *       await deleteCredential(credential);
 *     }
 *   };
 *   
 *   const refreshCredentials = async () => {
 *     await fetchCredentials();
 *   };
 *   
 *   return (
 *     <div>
 *       <h3>My Credentials ({credentials.length})</h3>
 *       <button onClick={refreshCredentials}>Refresh</button>
 *       
 *       {credentials.map((credential, index) => (
 *         <div key={index}>
 *           <h4>{credential.claims.name || 'Unnamed Credential'}</h4>
 *           <p>Issuer: {credential.issuer}</p>
 *           <button onClick={() => removeCredential(credential)}>
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
export const CredentialsContext = createContext<{
    /** Array of stored credentials */
    credentials: SDK.Domain.Credential[];
    /** Function to delete a credential */
    deleteCredential: (credential: SDK.Domain.Credential) => Promise<void>;
    /** Function to refresh credentials from storage */
    fetchCredentials: () => Promise<SDK.Domain.Credential[]>;
} | undefined>(undefined);

/**
 * React context for DID connection management.
 * 
 * Provides functionality for managing established DID connections (relationships
 * between DIDs) including viewing and deleting connections. Essential for managing
 * the network of trusted relationships in an identity system.
 * 
 * @example
 * ```tsx
 * import { ConnectionsContext } from '@trust0/identus-react/context';
 * import { useContext } from 'react';
 * 
 * function ConnectionManager() {
 *   const context = useContext(ConnectionsContext);
 *   
 *   if (!context) {
 *     throw new Error('ConnectionManager must be used within ConnectionsProvider');
 *   }
 *   
 *   const { connections, deleteConnection } = context;
 *   
 *   const removeConnection = async (connection: SDK.Domain.DIDPair) => {
 *     if (confirm('Delete this connection?')) {
 *       await deleteConnection(connection);
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       <h3>My Connections ({connections.length})</h3>
 *       
 *       {connections.map((connection, index) => (
 *         <div key={index}>
 *           <h4>Connection {index + 1}</h4>
 *           <p>Host: {connection.host.toString()}</p>
 *           <p>Receiver: {connection.receiver.toString()}</p>
 *           <button onClick={() => removeConnection(connection)}>
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
export const ConnectionsContext = createContext<{
    /** Array of established DID connections */
    connections: SDK.Domain.DIDPair[];
    /** Function to delete a connection */
    deleteConnection: (connection: SDK.Domain.DIDPair) => Promise<void>;
} | undefined>(undefined);

