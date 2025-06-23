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

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  ConnectionsProvider: () => ConnectionsProvider,
  CredentialsProvider: () => CredentialsProvider,
  HolderProvider: () => HolderProvider,
  IssuerProvider: () => IssuerProvider,
  MessagesProvider: () => MessagesProvider,
  VerifierProvider: () => VerifierProvider,
  WithAgentProvider: () => WithAgentProvider,
  createAgentProvider: () => createAgentProvider
});
module.exports = __toCommonJS(index_exports);

// src/provider/Agent.tsx
var import_react4 = __toESM(require("react"));
var import_ridb_react2 = require("@trust0/ridb-react");
var import_identus_sdk5 = __toESM(require("@hyperledger/identus-sdk"));
var import_uuid = require("uuid");
var import_base64 = require("multiformats/bases/base64");
var import_ridb_react3 = require("@trust0/ridb-react");
var import_ridb = require("@trust0/ridb");
var import_identus_store = require("@trust0/identus-store");

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
var import_identus_sdk = __toESM(require("@hyperledger/identus-sdk"));
var import_react2 = require("react");
function useApollo() {
  const apollo = (0, import_react2.useMemo)(() => new import_identus_sdk.default.Apollo(), []);
  return apollo;
}
function useAgent() {
  const context = (0, import_react2.useContext)(AgentContext);
  if (!context) {
    throw new Error("useAgent must be used within a AgentProvider");
  }
  return context;
}

// src/resolver/index.ts
var import_identus_sdk2 = __toESM(require("@hyperledger/identus-sdk"));
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
      const servicesProperty = new import_identus_sdk2.default.Domain.DIDDocument.Services(
        didDocument.service ?? []
      );
      const verificationMethodsProperty = new import_identus_sdk2.default.Domain.DIDDocument.VerificationMethods(
        didDocument.verificationMethod ?? []
      );
      const coreProperties = [];
      const authenticate = [];
      const assertion = [];
      for (const verificationMethod of didDocument.verificationMethod) {
        const isAssertion = didDocument.assertionMethod?.find((method) => method === verificationMethod.id);
        if (isAssertion) {
          assertion.push(new import_identus_sdk2.default.Domain.DIDDocument.AssertionMethod([isAssertion], [verificationMethod]));
        }
        const isAuthentication = didDocument.authentication?.find((method) => method === verificationMethod.id);
        if (isAuthentication) {
          authenticate.push(new import_identus_sdk2.default.Domain.DIDDocument.Authentication([isAuthentication], [verificationMethod]));
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
      const resolved = new import_identus_sdk2.default.Domain.DIDDocument(
        import_identus_sdk2.default.Domain.DID.fromString(didString),
        coreProperties
      );
      return resolved;
    }
  };
}

// src/db/index.ts
var import_ridb_core = require("@trust0/ridb-core");
var import_identus_sdk3 = __toESM(require("@hyperledger/identus-sdk"));
var collections = import_identus_sdk3.default.makeCollections();
function migrateSchema({ properties: schemaProperties, ...schemaWithoutProperties }, additionalProperties) {
  const schema = {
    ...schemaWithoutProperties,
    version: 0,
    encrypted: schemaWithoutProperties.encrypted || [],
    properties: Object.fromEntries(
      Object.entries({
        ...schemaProperties,
        ...additionalProperties
      }).map(([key, value]) => {
        const propValue = { ...value };
        propValue.required = propValue?.required === true;
        propValue.maxLength = void 0;
        return [key, propValue];
      })
    )
  };
  return schema;
}
function extractSchemas(collections2) {
  const result = {};
  for (const key in collections2) {
    if (Object.prototype.hasOwnProperty.call(collections2, key)) {
      result[key] = migrateSchema(collections2[key].schema, {});
    }
  }
  return result;
}
function extractMigrations(collections2) {
  const result = {};
  for (const key in collections2) {
    if (Object.prototype.hasOwnProperty.call(collections2, key)) {
      result[key] = migrateSchema(collections2[key].schema, {});
    }
  }
  return result;
}
var schemas = {
  ...extractSchemas(collections),
  credentials: migrateSchema(collections.credentials.schema, {
    status: {
      type: import_ridb_core.SchemaFieldType.string
    }
  }),
  dids: migrateSchema(collections.dids.schema, {
    status: {
      type: import_ridb_core.SchemaFieldType.string
    }
  }),
  messages: migrateSchema(collections.messages.schema, {
    read: {
      type: import_ridb_core.SchemaFieldType.boolean,
      default: false,
      required: true
    }
  })
};
var issuerSchemas = {
  ...schemas,
  issuance: {
    version: 0,
    primaryKey: "id",
    type: import_ridb_core.SchemaFieldType.object,
    encrypted: ["claims"],
    properties: {
      id: {
        type: import_ridb_core.SchemaFieldType.string,
        required: true
      },
      claims: {
        type: import_ridb_core.SchemaFieldType.array,
        items: {
          type: import_ridb_core.SchemaFieldType.object,
          properties: {
            name: {
              type: import_ridb_core.SchemaFieldType.string,
              required: true
            },
            value: {
              type: import_ridb_core.SchemaFieldType.string,
              required: true
            },
            type: {
              type: import_ridb_core.SchemaFieldType.string,
              required: true
            }
          }
        }
      },
      credentialFormat: {
        type: import_ridb_core.SchemaFieldType.string,
        required: true
      },
      automaticIssuance: {
        type: import_ridb_core.SchemaFieldType.boolean
      },
      issuingDID: {
        type: import_ridb_core.SchemaFieldType.string,
        required: true
      },
      status: {
        type: import_ridb_core.SchemaFieldType.string,
        required: true
      }
    }
  }
};
var migrations = extractMigrations(collections);

// src/provider/Messages.tsx
var import_react3 = __toESM(require("react"));
var import_identus_sdk4 = __toESM(require("@hyperledger/identus-sdk"));
var import_ridb_react = require("@trust0/ridb-react");

// src/utils/index.ts
var hasDB = (db) => db !== null;

// src/provider/Messages.tsx
function MessagesProvider({ children }) {
  const { agent } = useAgent();
  const { db, state: dbState } = (0, import_ridb_react.useRIDB)();
  const [messages, setMessages] = (0, import_react3.useState)([]);
  (0, import_react3.useEffect)(() => {
    if (hasDB(db) && dbState === "loaded") {
      db.collections.messages.find({}).then((messages2) => {
        setMessages(messages2.map((message) => ({
          message: import_identus_sdk4.default.Domain.Message.fromJson(message.dataJson),
          read: message.read ?? false
        })));
      });
    }
  }, [db, dbState]);
  const readMessage = (0, import_react3.useCallback)(async (message) => {
    if (hasDB(db) && dbState === "loaded") {
      const [found] = await db.collections.messages.find({ $or: [{ read: true }, { id: message.id }] });
      if (found) {
        await db.collections.messages.update({
          ...found,
          read: true
        });
      }
    }
  }, [db, dbState]);
  const deleteMessage = (0, import_react3.useCallback)(async (message) => {
    if (!hasDB(db) || dbState !== "loaded") {
      throw new Error("Database not connected");
    }
    const query = { $or: [{ uuid: message.uuid }, { id: message.id }] };
    const [found] = await db.collections.messages.find(query);
    if (found) {
      await db.collections.messages.delete(found.uuid);
    }
  }, [db, dbState]);
  const onMessage = (0, import_react3.useCallback)(async (messages2) => {
    setMessages((prev) => {
      const newMessages = messages2.filter(
        (message) => !prev.some((m) => m.message.id === message.id)
      );
      return [...prev, ...newMessages.map((message) => ({ message, read: false }))];
    });
  }, [setMessages]);
  (0, import_react3.useEffect)(() => {
    if (agent) {
      agent.addListener(import_identus_sdk4.default.ListenerKey.MESSAGE, onMessage);
      return () => {
        agent.removeListener(import_identus_sdk4.default.ListenerKey.MESSAGE, onMessage);
      };
    }
  }, [agent, onMessage]);
  return /* @__PURE__ */ import_react3.default.createElement(MessagesContext.Provider, { value: { messages, readMessage, deleteMessage } }, children);
}

// src/provider/Agent.tsx
function WithAgentProvider(options) {
  const { children, seed, resolverUrl, mediatorDID, resolvers } = options;
  const Provider = createAgentProvider({ seed, resolverUrl, mediatorDID, resolvers });
  return /* @__PURE__ */ import_react4.default.createElement(import_ridb_react2.RIDBDatabase, { startOptions: { dbName: "sample", storageType: import_ridb.StorageType.IndexDB }, schemas, migrations }, /* @__PURE__ */ import_react4.default.createElement(Provider, null, /* @__PURE__ */ import_react4.default.createElement(MessagesProvider, null, children)));
}
function VerifierProvider({ children }) {
  const { agent, start, stop, state } = useAgent();
  const issuePresentationRequest = (0, import_react4.useCallback)(async (type, toDID, claims) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    const task = new import_identus_sdk5.default.Tasks.CreatePresentationRequest({ type, toDID, claims });
    const requestPresentation = await agent.runTask(task);
    const requestPresentationMessage = requestPresentation.makeMessage();
    await agent.send(requestPresentationMessage);
  }, [agent]);
  const verifyPresentation = (0, import_react4.useCallback)(async (presentation) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    if (presentation.piuri !== import_identus_sdk5.default.ProtocolType.DidcommRequestPresentation) {
      throw new Error("Invalid presentation type");
    }
    return agent.handle(presentation);
  }, [agent]);
  return /* @__PURE__ */ import_react4.default.createElement(VerifierContext.Provider, { value: { agent, start, stop, state, issuePresentationRequest, verifyPresentation } }, children);
}
function HolderProvider({ children }) {
  const { agent, start, stop, state } = useAgent();
  const parseOOBOffer = (0, import_react4.useCallback)(async (offer, selfPeerDID) => {
    const message = import_identus_sdk5.default.Domain.Message.fromJson(offer);
    const attachment = message.attachments.at(0)?.payload;
    return import_identus_sdk5.default.Domain.Message.fromJson({
      ...attachment,
      from: message.from,
      to: selfPeerDID
    });
  }, []);
  const handlePresentationRequest = (0, import_react4.useCallback)(async (message, credential) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    const request = import_identus_sdk5.default.RequestPresentation.fromMessage(message);
    const task = new import_identus_sdk5.default.Tasks.CreatePresentation({ request, credential });
    const presentation = await agent.runTask(task);
    const presentationMessage = presentation.makeMessage();
    await agent.send(presentationMessage);
  }, [agent]);
  const acceptOOBOffer = (0, import_react4.useCallback)(async (offer) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    const credentialOfferMessage = import_identus_sdk5.default.OfferCredential.fromMessage(offer);
    const requestCredential = await agent.handle(credentialOfferMessage.makeMessage());
    const requestMessage = requestCredential.makeMessage();
    await agent.send(requestMessage);
  }, [agent]);
  return /* @__PURE__ */ import_react4.default.createElement(HolderContext.Provider, { value: { agent, start, stop, state, parseOOBOffer, handlePresentationRequest, acceptOOBOffer } }, children);
}
function IssuerProvider({ children }) {
  const { agent, start, stop, state } = useAgent();
  const createOOBOffer = (0, import_react4.useCallback)(async (type, id, claims) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    if (type !== import_identus_sdk5.default.Domain.CredentialType.JWT && type !== import_identus_sdk5.default.Domain.CredentialType.SDJWT) {
      throw new Error("Invalid credential type");
    }
    const peerDID = await agent.createNewPeerDID();
    const oobTask = new import_identus_sdk5.default.Tasks.CreateOOBOffer({
      from: peerDID,
      offer: new import_identus_sdk5.default.OfferCredential(
        {
          goal_code: "Offer Credential",
          credential_preview: {
            type: import_identus_sdk5.default.ProtocolType.DidcommCredentialPreview,
            body: {
              attributes: claims
            }
          }
        },
        [
          new import_identus_sdk5.default.Domain.AttachmentDescriptor(
            {
              json: {
                id: (0, import_uuid.v4)(),
                media_type: "application/json",
                options: {
                  challenge: (0, import_uuid.v4)(),
                  domain: "localhost"
                },
                thid: id,
                presentation_definition: {
                  id: (0, import_uuid.v4)(),
                  input_descriptors: [],
                  format: {
                    jwt: {
                      alg: ["ES256K"],
                      proof_type: []
                    }
                  }
                },
                format: type,
                piuri: import_identus_sdk5.default.ProtocolType.DidcommOfferCredential
              }
            },
            "application/json",
            id,
            void 0,
            type
          )
        ],
        void 0,
        void 0,
        id
      )
    });
    const oob = await agent.runTask(oobTask);
    const oobDecoded = import_base64.base64.baseDecode(oob);
    const oobJson = Buffer.from(oobDecoded).toString();
    return oobJson;
  }, [agent]);
  const issueCredential = (0, import_react4.useCallback)(async (type, message, claims, issuerDID, holderDID) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    if (type !== import_identus_sdk5.default.Domain.CredentialType.JWT && type !== import_identus_sdk5.default.Domain.CredentialType.SDJWT) {
      throw new Error("Invalid credential type");
    }
    const protocol = new import_identus_sdk5.default.Tasks.RunProtocol({
      type: "credential-request",
      pid: import_identus_sdk5.default.ProtocolType.DidcommRequestCredential,
      data: {
        issuerDID,
        holderDID,
        message,
        format: type,
        claims
      }
    });
    const issued = await agent.runTask(protocol);
    await agent.send(issued.makeMessage());
  }, [agent]);
  return /* @__PURE__ */ import_react4.default.createElement(IssuerContext.Provider, { value: { agent, start, stop, state, createOOBOffer, issueCredential } }, children);
}
function createAgentProvider(options) {
  const { seed, resolverUrl, mediatorDID, resolvers } = options;
  return function AgentProvider({ children }) {
    const apollo = useApollo();
    const { db } = (0, import_ridb_react3.useRIDB)();
    const store = (0, import_identus_store.createStore)({ db, storageType: import_ridb.StorageType.IndexDB });
    const pluto = (0, import_react4.useMemo)(() => new import_identus_sdk5.default.Pluto(store, apollo), [store, apollo]);
    const [agent, setAgent] = (0, import_react4.useState)(null);
    const [state, setState] = (0, import_react4.useState)(import_identus_sdk5.default.Domain.Startable.State.STOPPED);
    const stop = (0, import_react4.useCallback)(async () => {
      setState(import_identus_sdk5.default.Domain.Startable.State.STOPPING);
      try {
        await agent?.connections.stop();
        await agent?.jobs.stop();
        setState(import_identus_sdk5.default.Domain.Startable.State.STOPPED);
      } catch (error) {
        console.log("Error stopping agent:", error);
      } finally {
        setAgent(null);
      }
    }, [agent, setState, setAgent]);
    const start = (0, import_react4.useCallback)(async (startOptions) => {
      if (!db) {
        throw new Error("No db found");
      }
      await db.start(startOptions);
      setState(import_identus_sdk5.default.Domain.Startable.State.STARTING);
      const apollo2 = new import_identus_sdk5.default.Apollo();
      if (resolverUrl) {
        resolvers.push(createResolver(resolverUrl));
      }
      const castor = new import_identus_sdk5.default.Castor(apollo2, resolvers);
      const agent2 = await import_identus_sdk5.default.Agent.initialize({
        apollo: apollo2,
        castor,
        mediatorDID,
        pluto,
        seed
      });
      await agent2.start();
      setState(import_identus_sdk5.default.Domain.Startable.State.RUNNING);
      setAgent(agent2);
    }, [db, pluto]);
    return /* @__PURE__ */ import_react4.default.createElement(AgentContext.Provider, { value: { agent, setAgent, start, stop, state } }, children);
  };
}

// src/provider/Connections.tsx
var import_react5 = __toESM(require("react"));
var import_identus_sdk6 = __toESM(require("@hyperledger/identus-sdk"));
var import_ridb_react4 = require("@trust0/ridb-react");
function ConnectionsProvider({ children }) {
  const { agent } = useAgent();
  const { db, state: dbState } = (0, import_ridb_react4.useRIDB)();
  const [connections, setConnections] = (0, import_react5.useState)([]);
  (0, import_react5.useEffect)(() => {
    if (db && dbState === "loaded") {
      agent?.pluto.getAllDidPairs().then(setConnections);
    }
  }, [agent, db, dbState]);
  const deleteConnection = (0, import_react5.useCallback)(async (connection) => {
    if (!hasDB(db) || dbState !== "loaded") {
      throw new Error("Database not connected");
    }
    const connections2 = await db.collections["did-link"].find({
      $or: [
        { role: import_identus_sdk6.default.Domain.Models.DIDLink.role.pair, hostId: connection.host.toString() },
        { role: import_identus_sdk6.default.Domain.Models.DIDLink.role.pair, targetId: connection.receiver.toString() }
      ]
    });
    for (const connection2 of connections2) {
      await db.collections["did-link"].delete(connection2.uuid);
    }
  }, [db, dbState]);
  return /* @__PURE__ */ import_react5.default.createElement(ConnectionsContext.Provider, { value: { connections, deleteConnection } }, children);
}

// src/provider/Credentials.tsx
var import_react6 = __toESM(require("react"));
var import_ridb_react5 = require("@trust0/ridb-react");
function CredentialsProvider({ children }) {
  const { agent } = useAgent();
  const { db, state: dbState } = (0, import_ridb_react5.useRIDB)();
  const [credentials, setCredentials] = (0, import_react6.useState)([]);
  (0, import_react6.useEffect)(() => {
    agent?.pluto.getAllCredentials().then(setCredentials);
  }, [agent]);
  const deleteCredential = (0, import_react6.useCallback)(async (credential) => {
    if (!hasDB(db) || dbState !== "loaded") {
      throw new Error("Database not connected");
    }
    await db.collections.credentials.delete(credential.uuid);
  }, [db, dbState]);
  return /* @__PURE__ */ import_react6.default.createElement(CredentialsContext.Provider, { value: { credentials, deleteCredential } }, children);
}
