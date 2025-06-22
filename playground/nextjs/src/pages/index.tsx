import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import SDK from "@hyperledger/identus-sdk";
import { 
  WithAgentProvider, 
  HolderProvider, 
  IssuerProvider, 
  VerifierProvider 
} from "@trust0/identus-react";
import { useAgent, useApollo } from "@trust0/identus-react/hooks";

// Demo component that uses the identus-react hooks
function IdentityDemo() {
  const { agent, start, stop, state } = useAgent();
  const [did, setDid] = useState<SDK.Domain.DID | null>(null);
  const [peerDID, setPeerDID] = useState<SDK.Domain.DID | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartAgent = async () => {
    try {
      setLoading(true);
      setError(null);
      await start();
    } catch (err) {
      setError(`Error starting agent: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStopAgent = async () => {
    try {
      setLoading(true);
      setError(null);
      await stop();
      setDid(null);
      setPeerDID(null);
    } catch (err) {
      setError(`Error stopping agent: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDID = async () => {
    if (!agent) return;
    
    try {
      setLoading(true);
      setError(null);
      const newDID = await agent.createNewPrismDID("deom");
      setDid(newDID);
    } catch (err) {
      setError(`Error creating DID: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePeerDID = async () => {
    if (!agent) return;
    
    try {
      setLoading(true);
      setError(null);
      const newPeerDID = await agent.createNewPeerDID();
      setPeerDID(newPeerDID);
    } catch (err) {
      setError(`Error creating Peer DID: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const getStateColor = () => {
    switch (state) {
      case SDK.Domain.Startable.State.RUNNING:
        return "text-green-600";
      case SDK.Domain.Startable.State.STARTING:
      case SDK.Domain.Startable.State.STOPPING:
        return "text-yellow-600";
      case SDK.Domain.Startable.State.STOPPED:
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Hyperledger Identus React Demo
        </h1>
        
        {/* Agent Status */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Agent Status</h2>
          <p className={`font-medium ${getStateColor()}`}>
            Status: {state}
          </p>
          <div className="mt-4 space-x-4">
            <button
              onClick={handleStartAgent}
              disabled={loading || state === SDK.Domain.Startable.State.RUNNING}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Starting..." : "Start Agent"}
            </button>
            <button
              onClick={handleStopAgent}
              disabled={loading || state === SDK.Domain.Startable.State.STOPPED}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Stopping..." : "Stop Agent"}
            </button>
          </div>
        </div>

        {/* DID Management */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">DID Management</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <button
                  onClick={handleCreateDID}
                  disabled={!agent || loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Prism DID
                </button>
                <button
                  onClick={handleCreatePeerDID}
                  disabled={!agent || loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Peer DID
                </button>
              </div>
              
              {did && (
                <div className="mt-2 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm font-medium text-blue-800">Prism DID:</p>
                  <p className="text-sm text-blue-600 break-all font-mono">{did.toString()}</p>
                </div>
              )}
              
              {peerDID && (
                <div className="mt-2 p-3 bg-purple-50 rounded-md">
                  <p className="text-sm font-medium text-purple-800">Peer DID:</p>
                  <p className="text-sm text-purple-600 break-all font-mono">{peerDID.toString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 font-medium">Error:</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">About This Demo</h3>
          <p className="text-blue-700 text-sm">
            This demo showcases the <code>identus-react</code> package for building decentralized identity applications. 
            The package provides React hooks and providers for managing Hyperledger Identus agents, DIDs, credentials, and verifiable presentations.
          </p>
          <ul className="mt-2 text-blue-700 text-sm list-disc list-inside space-y-1">
            <li><strong>Agent:</strong> Core identity management service</li>
            <li><strong>Prism DID:</strong> Blockchain-anchored decentralized identifier</li>
            <li><strong>Peer DID:</strong> Off-chain decentralized identifier for peer-to-peer communication</li>
            <li><strong>Credentials:</strong> Verifiable credentials for sharing trusted information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Dynamically import the component with SSR disabled to avoid React hooks issues during server-side rendering
const ClientOnlyIdentityDemo = dynamic(() => Promise.resolve(IdentityDemo), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen"><div className="text-lg">Loading...</div></div>
});

export default function Home() {

  const seed = undefined as any
  const mediatorDID = SDK.Domain.DID.fromString("did:peer:2.Ez6LSr75gLoSwaVHS7MTzcKLXjt9onJMXY9aVEBGWY8ahWPdn.Vz6Mkw5SdxCCxRTfHx1LaGvh2e5JWPWJs7Ek6mjiPXRxqnYHT.SeyJ0IjoiZG0iLCJzIjp7InVyaSI6Imh0dHBzOi8vbWVkaWF0b3IudHJ1c3QwLmlkIiwiYSI6WyJkaWRjb21tL3YyIl19fQ.SeyJ0IjoiZG0iLCJzIjp7InVyaSI6IndzOi8vbWVkaWF0b3IudHJ1c3QwLmlkL3dzIiwiYSI6WyJkaWRjb21tL3YyIl19fQ");
  const resolverUrl = "https://resolver.jribo.kiwi/1.0/identifiers/";

  return (
    <>
      <Head>
        <title>Identus React Demo</title>
        <meta name="description" content="Demo of the identus-react package" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <WithAgentProvider 
          seed={seed} 
          resolverUrl={resolverUrl} 
          mediatorDID={mediatorDID} 
          resolvers={[]}
        >
          <ClientOnlyIdentityDemo />
        </WithAgentProvider>
      </div>
    </>
  );
} 