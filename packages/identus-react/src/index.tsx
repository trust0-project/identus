/**
 * @packageDocumentation
 * 
 * React components and hooks for building decentralized identity applications using Hyperledger Identus on Cardano.
 * 
 * This package provides a comprehensive set of React hooks, contexts, and providers that simplify the integration
 * of Hyperledger Identus SDK functionality into React applications. It handles agent management, credential 
 * issuance and verification, DID operations, and secure storage.
 * 
 * ## Features
 * 
 * - **Agent Management**: Start/stop Identus agents with React lifecycle integration
 * - **Credential Operations**: Issue, verify, and manage verifiable credentials
 * - **DID Management**: Create and manage Prism and Peer DIDs
 * - **Message Handling**: Process DIDComm messages and presentations
 * - **Database Integration**: Persistent storage with IndexedDB support
 * - **TypeScript Support**: Full type safety and IntelliSense support
 * 
 * ## Quick Start
 * 
 * ```tsx
 * import { AgentProvider, useAgent, useCredentials } from '@trust0/identus-react';
 * 
 * function App() {
 *   return (
 *     <AgentProvider>
 *       <MyIdentityApp />
 *     </AgentProvider>
 *   );
 * }
 * 
 * function MyIdentityApp() {
 *   const { agent, start, state } = useAgent();
 *   const { credentials } = useCredentials();
 * 
 *   return (
 *     <div>
 *       <button onClick={start}>Start Agent</button>
 *       <p>Agent State: {state}</p>
 *       <p>Credentials: {credentials.length}</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * ## Key Exports
 * 
 * - **Providers**: AgentProvider, DatabaseProvider, etc.
 * - **Hooks**: useAgent, useCredentials, useMessages, etc.
 * - **Contexts**: AgentContext, CredentialsContext, etc.
 * - **Types**: Various TypeScript interfaces and types
 * 
 * ## Documentation
 * 
 * For detailed documentation and examples, visit:
 * - [GitHub Repository](https://github.com/trust0-project/identus-react)
 * - [Hyperledger Identus Documentation](https://docs.atalaprism.io/)
 */
export * from "./provider";