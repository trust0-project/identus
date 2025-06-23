"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/index.ts
var hooks_exports = {};
__export(hooks_exports, {
  useAgent: () => useAgent,
  useApollo: () => useApollo,
  useCastor: () => useCastor,
  useCredentials: () => useCredentials,
  useHolder: () => useHolder,
  useIssuer: () => useIssuer,
  useMessages: () => useMessages,
  useVerifier: () => useVerifier
});
module.exports = __toCommonJS(hooks_exports);
var import_identus_sdk = __toESM(require("@hyperledger/identus-sdk"));
var import_react2 = require("react");

// src/context/index.ts
var import_react = require("react");
var PrismDIDContext = (0, import_react.createContext)(void 0);
var AgentContext = (0, import_react.createContext)(void 0);
var IssuerContext = (0, import_react.createContext)(void 0);
var VerifierContext = (0, import_react.createContext)(void 0);
var HolderContext = (0, import_react.createContext)(void 0);
var MessagesContext = (0, import_react.createContext)(void 0);
var CredentialsContext = (0, import_react.createContext)(void 0);
var ConnectionsContext = (0, import_react.createContext)(void 0);

// src/hooks/index.ts
function useApollo() {
  const apollo = (0, import_react2.useMemo)(() => new import_identus_sdk.default.Apollo(), []);
  return apollo;
}
function useCastor(resolvers = []) {
  const apollo = useApollo();
  const castor = (0, import_react2.useMemo)(() => new import_identus_sdk.default.Castor(apollo, resolvers), [apollo, resolvers]);
  return castor;
}
function useAgent() {
  const context = (0, import_react2.useContext)(AgentContext);
  if (!context) {
    throw new Error("useAgent must be used within a AgentProvider");
  }
  return context;
}
function useIssuer() {
  const context = (0, import_react2.useContext)(IssuerContext);
  if (!context) {
    throw new Error("useIssuer must be used within a IssuerProvider");
  }
  return context;
}
function useHolder() {
  const context = (0, import_react2.useContext)(HolderContext);
  if (!context) {
    throw new Error("useHolder must be used within a HolderProvider");
  }
  return context;
}
function useVerifier() {
  const context = (0, import_react2.useContext)(VerifierContext);
  if (!context) {
    throw new Error("useVerifier must be used within a VerifierProvider");
  }
  return context;
}
function useMessages() {
  const context = (0, import_react2.useContext)(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
}
function useCredentials() {
  const context = (0, import_react2.useContext)(CredentialsContext);
  if (!context) {
    throw new Error("useCredentials must be used within a CredentialsProvider");
  }
  return context;
}
