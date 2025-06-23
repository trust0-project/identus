"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/context/index.ts
var context_exports = {};
__export(context_exports, {
  AgentContext: () => AgentContext,
  ConnectionsContext: () => ConnectionsContext,
  CredentialsContext: () => CredentialsContext,
  HolderContext: () => HolderContext,
  IssuerContext: () => IssuerContext,
  MessagesContext: () => MessagesContext,
  PrismDIDContext: () => PrismDIDContext,
  VerifierContext: () => VerifierContext
});
module.exports = __toCommonJS(context_exports);
var import_react = require("react");
var PrismDIDContext = (0, import_react.createContext)(void 0);
var AgentContext = (0, import_react.createContext)(void 0);
var IssuerContext = (0, import_react.createContext)(void 0);
var VerifierContext = (0, import_react.createContext)(void 0);
var HolderContext = (0, import_react.createContext)(void 0);
var MessagesContext = (0, import_react.createContext)(void 0);
var CredentialsContext = (0, import_react.createContext)(void 0);
var ConnectionsContext = (0, import_react.createContext)(void 0);
