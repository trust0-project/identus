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

// src/resolver/index.ts
var resolver_exports = {};
__export(resolver_exports, {
  createResolver: () => createResolver
});
module.exports = __toCommonJS(resolver_exports);
var import_identus_sdk = __toESM(require("@hyperledger/identus-sdk"));
function createResolver(baseUrl) {
  return class {
    method = "prism";
    async resolve(didString) {
      const url = baseUrl.replace(/\/$/, "") + "/" + didString;
      const response = await fetch(url, {
        "headers": {
          "accept": "*/*",
          "accept-language": "en",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "sec-gpc": "1"
        },
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const didDocument = data;
      const servicesProperty = new import_identus_sdk.default.Domain.DIDDocument.Services(
        didDocument.service ?? []
      );
      const verificationMethodsProperty = new import_identus_sdk.default.Domain.DIDDocument.VerificationMethods(
        didDocument.verificationMethod ?? []
      );
      const coreProperties = [];
      const authenticate = [];
      const assertion = [];
      for (const verificationMethod of didDocument.verificationMethod) {
        const isAssertion = didDocument.assertionMethod?.find((method) => method === verificationMethod.id);
        if (isAssertion) {
          assertion.push(new import_identus_sdk.default.Domain.DIDDocument.AssertionMethod([isAssertion], [verificationMethod]));
        }
        const isAuthentication = didDocument.authentication?.find((method) => method === verificationMethod.id);
        if (isAuthentication) {
          authenticate.push(new import_identus_sdk.default.Domain.DIDDocument.Authentication([isAuthentication], [verificationMethod]));
        }
      }
      coreProperties.push(...authenticate);
      coreProperties.push(...assertion);
      if (servicesProperty.values.length > 0) {
        coreProperties.push(servicesProperty);
      }
      if (verificationMethodsProperty.values.length > 0) {
        coreProperties.push(verificationMethodsProperty);
      }
      const resolved = new import_identus_sdk.default.Domain.DIDDocument(
        import_identus_sdk.default.Domain.DID.fromString(didString),
        coreProperties
      );
      return resolved;
    }
  };
}
