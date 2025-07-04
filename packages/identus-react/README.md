# ⚛️ Identus React

A comprehensive React library for building Self-Sovereign Identity (SSI) applications with [Hyperledger Identus SDK](https://github.com/hyperledger-identus/sdk-ts). This library provides React components, hooks, and providers for rapid integration of decentralized identity functionality into your React applications.

## 🚀 Features

### 🎯 Core Identity Features
- **DID Management** - Create and manage Prism DIDs (blockchain-anchored) and Peer DIDs (ephemeral)
- **Credential Operations** - Issue, hold, and verify credentials with full W3C standards compliance
- **DIDComm Messaging** - Secure peer-to-peer messaging with automatic encryption
- **Connection Management** - Establish and manage secure connections between identity agents

### 🛠️ Developer Experience
- **Pre-configured Providers** - Ready-to-use React context providers for all identity operations
- **Comprehensive Hooks** - Easy-to-use hooks for accessing identity functionality
- **Database Integration** - Built-in encrypted storage with RIDB for credential and DID management
- **TypeScript Support** - Full TypeScript definitions for type-safe development

### 🔧 Advanced Features
- **Multi-storage Support** - IndexedDB, memory, and custom storage backends
- **Custom DID Resolvers** - Extensible DID resolution with custom resolver support
- **Mediator Integration** - Built-in mediator support for reliable message delivery
- **Backup & Recovery** - Comprehensive backup and restore functionality

## 📦 Installation

```bash
npm install @trust0/identus-react @hyperledger/identus-sdk
```

```bash
yarn add @trust0/identus-react @hyperledger/identus-sdk
```

## 🏁 Quick Start

### 1. Basic Setup

Wrap your app with the `AgentProvider` to enable all identity functionality:

```tsx
import React from 'react';
import { AgentProvider } from '@trust0/identus-react';

function App() {
  return (
    <AgentProvider>
      <YourApp />
    </AgentProvider>
  );
}
```

### 2. Initialize the Agent

```tsx
import { useAgent, useDatabase } from '@trust0/identus-react/hooks';
import { StorageType } from '@trust0/ridb';

function IdentityWallet() {
  const { agent, start, stop, state } = useAgent();
  const { start: startDB, setSeed, setMediator } = useDatabase();

  const initializeWallet = async () => {
    // Initialize database
    await startDB({
      name: 'my-identity-wallet',
      storageType: StorageType.IndexDB,
      schemas: schemas
    });

    // Set wallet seed (generate or import)
    await setSeed(SDK.Domain.Seed.fromString('your-seed-here'));
    
    // Set mediator for message delivery
    await setMediator(SDK.Domain.DID.fromString('did:peer:mediator-did'));

    // Start the agent
    await start();
  };

  return (
    <div>
      <h2>Identity Wallet</h2>
      <p>Status: {state}</p>
      
      {state === 'stopped' && (
        <button onClick={initializeWallet}>
          Initialize Wallet
        </button>
      )}
      
      {state === 'running' && (
        <button onClick={stop}>
          Stop Agent
        </button>
      )}
    </div>
  );
}
```

### 3. Create and Manage DIDs

```tsx
import { usePrismDID, usePeerDID } from '@trust0/identus-react/hooks';

function DIDManager() {
  const { prismDID, create: createPrismDID } = usePrismDID();
  const { peerDID, create: createPeerDID } = usePeerDID();

  return (
    <div>
      <h3>DID Management</h3>
      
      {/* Prism DID (Blockchain-anchored) */}
      <div>
        <h4>Prism DID</h4>
        {prismDID ? (
          <p>DID: {prismDID.toString()}</p>
        ) : (
          <button onClick={() => createPrismDID('main-identity')}>
            Create Prism DID
          </button>
        )}
      </div>

      {/* Peer DID (Ephemeral) */}
      <div>
        <h4>Peer DID</h4>
        {peerDID ? (
          <p>DID: {peerDID.toString()}</p>
        ) : (
          <button onClick={createPeerDID}>
            Create Peer DID
          </button>
        )}
      </div>
    </div>
  );
}
```

## 🎛️ Core Concepts

### Hook Categories

| Category | Hooks | Purpose |
|----------|--------|---------|
| **Core** | `useAgent`, `useApollo`, `useCastor`, `usePluto` | SDK core components |
| **DID** | `usePrismDID`, `usePeerDID` | DID creation and management |
| **Credentials** | `useIssuer`, `useHolder`, `useVerifier` | Credential lifecycle |
| **Communication** | `useMessages`, `useConnections` | DIDComm messaging |
| **Data** | `useDatabase`, `useCredentials` | Storage and retrieval |
