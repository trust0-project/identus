import {
  AgentContext,
  CredentialsContext,
  HolderContext,
  IssuerContext,
  MessagesContext,
  VerifierContext
} from "./chunk-RLWLUO6Q.mjs";

// src/hooks/index.ts
import SDK from "@hyperledger/identus-sdk";
import { useContext, useMemo } from "react";
function useApollo() {
  const apollo = useMemo(() => new SDK.Apollo(), []);
  return apollo;
}
function useCastor(resolvers = []) {
  const apollo = useApollo();
  const castor = useMemo(() => new SDK.Castor(apollo, resolvers), [apollo, resolvers]);
  return castor;
}
function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgent must be used within a AgentProvider");
  }
  return context;
}
function useIssuer() {
  const context = useContext(IssuerContext);
  if (!context) {
    throw new Error("useIssuer must be used within a IssuerProvider");
  }
  return context;
}
function useHolder() {
  const context = useContext(HolderContext);
  if (!context) {
    throw new Error("useHolder must be used within a HolderProvider");
  }
  return context;
}
function useVerifier() {
  const context = useContext(VerifierContext);
  if (!context) {
    throw new Error("useVerifier must be used within a VerifierProvider");
  }
  return context;
}
function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
}
function useCredentials() {
  const context = useContext(CredentialsContext);
  if (!context) {
    throw new Error("useCredentials must be used within a CredentialsProvider");
  }
  return context;
}

export {
  useApollo,
  useCastor,
  useAgent,
  useIssuer,
  useHolder,
  useVerifier,
  useMessages,
  useCredentials
};
