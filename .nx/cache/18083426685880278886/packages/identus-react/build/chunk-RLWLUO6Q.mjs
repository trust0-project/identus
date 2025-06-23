// src/context/index.ts
import { createContext } from "react";
var PrismDIDContext = createContext(void 0);
var AgentContext = createContext(void 0);
var IssuerContext = createContext(void 0);
var VerifierContext = createContext(void 0);
var HolderContext = createContext(void 0);
var MessagesContext = createContext(void 0);
var CredentialsContext = createContext(void 0);
var ConnectionsContext = createContext(void 0);

export {
  PrismDIDContext,
  AgentContext,
  IssuerContext,
  VerifierContext,
  HolderContext,
  MessagesContext,
  CredentialsContext,
  ConnectionsContext
};
