import {
  useAgent,
  useApollo
} from "./chunk-IFEJ6KWH.mjs";
import {
  AgentContext,
  ConnectionsContext,
  CredentialsContext,
  HolderContext,
  IssuerContext,
  MessagesContext,
  VerifierContext
} from "./chunk-RLWLUO6Q.mjs";
import {
  migrations,
  schemas
} from "./chunk-Y4FVLD66.mjs";
import {
  createResolver
} from "./chunk-5OAC2PPU.mjs";

// src/provider/Agent.tsx
import React2, { useCallback as useCallback2, useMemo, useState as useState2 } from "react";
import { RIDBDatabase } from "@trust0/ridb-react";
import SDK2 from "@hyperledger/identus-sdk";
import { v4 as uuidv4 } from "uuid";
import { base64 } from "multiformats/bases/base64";
import { useRIDB as useRIDB2 } from "@trust0/ridb-react";
import { StorageType } from "@trust0/ridb";
import { createStore } from "@trust0/identus-store";

// src/provider/Messages.tsx
import React, { useCallback, useEffect, useState } from "react";
import SDK from "@hyperledger/identus-sdk";
import { useRIDB } from "@trust0/ridb-react";

// src/utils/index.ts
var hasDB = (db) => db !== null;

// src/provider/Messages.tsx
function MessagesProvider({ children }) {
  const { agent } = useAgent();
  const { db, state: dbState } = useRIDB();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (hasDB(db) && dbState === "loaded") {
      db.collections.messages.find({}).then((messages2) => {
        setMessages(messages2.map((message) => ({
          message: SDK.Domain.Message.fromJson(message.dataJson),
          read: message.read ?? false
        })));
      });
    }
  }, [db, dbState]);
  const readMessage = useCallback(async (message) => {
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
  const deleteMessage = useCallback(async (message) => {
    if (!hasDB(db) || dbState !== "loaded") {
      throw new Error("Database not connected");
    }
    const query = { $or: [{ uuid: message.uuid }, { id: message.id }] };
    const [found] = await db.collections.messages.find(query);
    if (found) {
      await db.collections.messages.delete(found.uuid);
    }
  }, [db, dbState]);
  const onMessage = useCallback(async (messages2) => {
    setMessages((prev) => {
      const newMessages = messages2.filter(
        (message) => !prev.some((m) => m.message.id === message.id)
      );
      return [...prev, ...newMessages.map((message) => ({ message, read: false }))];
    });
  }, [setMessages]);
  useEffect(() => {
    if (agent) {
      agent.addListener(SDK.ListenerKey.MESSAGE, onMessage);
      return () => {
        agent.removeListener(SDK.ListenerKey.MESSAGE, onMessage);
      };
    }
  }, [agent, onMessage]);
  return /* @__PURE__ */ React.createElement(MessagesContext.Provider, { value: { messages, readMessage, deleteMessage } }, children);
}

// src/provider/Agent.tsx
function WithAgentProvider(options) {
  const { children, seed, resolverUrl, mediatorDID, resolvers } = options;
  const Provider = createAgentProvider({ seed, resolverUrl, mediatorDID, resolvers });
  return /* @__PURE__ */ React2.createElement(RIDBDatabase, { startOptions: { dbName: "sample", storageType: StorageType.IndexDB }, schemas, migrations }, /* @__PURE__ */ React2.createElement(Provider, null, /* @__PURE__ */ React2.createElement(MessagesProvider, null, children)));
}
function VerifierProvider({ children }) {
  const { agent, start, stop, state } = useAgent();
  const issuePresentationRequest = useCallback2(async (type, toDID, claims) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    const task = new SDK2.Tasks.CreatePresentationRequest({ type, toDID, claims });
    const requestPresentation = await agent.runTask(task);
    const requestPresentationMessage = requestPresentation.makeMessage();
    await agent.send(requestPresentationMessage);
  }, [agent]);
  const verifyPresentation = useCallback2(async (presentation) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    if (presentation.piuri !== SDK2.ProtocolType.DidcommRequestPresentation) {
      throw new Error("Invalid presentation type");
    }
    return agent.handle(presentation);
  }, [agent]);
  return /* @__PURE__ */ React2.createElement(VerifierContext.Provider, { value: { agent, start, stop, state, issuePresentationRequest, verifyPresentation } }, children);
}
function HolderProvider({ children }) {
  const { agent, start, stop, state } = useAgent();
  const parseOOBOffer = useCallback2(async (offer, selfPeerDID) => {
    const message = SDK2.Domain.Message.fromJson(offer);
    const attachment = message.attachments.at(0)?.payload;
    return SDK2.Domain.Message.fromJson({
      ...attachment,
      from: message.from,
      to: selfPeerDID
    });
  }, []);
  const handlePresentationRequest = useCallback2(async (message, credential) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    const request = SDK2.RequestPresentation.fromMessage(message);
    const task = new SDK2.Tasks.CreatePresentation({ request, credential });
    const presentation = await agent.runTask(task);
    const presentationMessage = presentation.makeMessage();
    await agent.send(presentationMessage);
  }, [agent]);
  const acceptOOBOffer = useCallback2(async (offer) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    const credentialOfferMessage = SDK2.OfferCredential.fromMessage(offer);
    const requestCredential = await agent.handle(credentialOfferMessage.makeMessage());
    const requestMessage = requestCredential.makeMessage();
    await agent.send(requestMessage);
  }, [agent]);
  return /* @__PURE__ */ React2.createElement(HolderContext.Provider, { value: { agent, start, stop, state, parseOOBOffer, handlePresentationRequest, acceptOOBOffer } }, children);
}
function IssuerProvider({ children }) {
  const { agent, start, stop, state } = useAgent();
  const createOOBOffer = useCallback2(async (type, id, claims) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    if (type !== SDK2.Domain.CredentialType.JWT && type !== SDK2.Domain.CredentialType.SDJWT) {
      throw new Error("Invalid credential type");
    }
    const peerDID = await agent.createNewPeerDID();
    const oobTask = new SDK2.Tasks.CreateOOBOffer({
      from: peerDID,
      offer: new SDK2.OfferCredential(
        {
          goal_code: "Offer Credential",
          credential_preview: {
            type: SDK2.ProtocolType.DidcommCredentialPreview,
            body: {
              attributes: claims
            }
          }
        },
        [
          new SDK2.Domain.AttachmentDescriptor(
            {
              json: {
                id: uuidv4(),
                media_type: "application/json",
                options: {
                  challenge: uuidv4(),
                  domain: "localhost"
                },
                thid: id,
                presentation_definition: {
                  id: uuidv4(),
                  input_descriptors: [],
                  format: {
                    jwt: {
                      alg: ["ES256K"],
                      proof_type: []
                    }
                  }
                },
                format: type,
                piuri: SDK2.ProtocolType.DidcommOfferCredential
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
    const oobDecoded = base64.baseDecode(oob);
    const oobJson = Buffer.from(oobDecoded).toString();
    return oobJson;
  }, [agent]);
  const issueCredential = useCallback2(async (type, message, claims, issuerDID, holderDID) => {
    if (!agent) {
      throw new Error("No agent found");
    }
    if (type !== SDK2.Domain.CredentialType.JWT && type !== SDK2.Domain.CredentialType.SDJWT) {
      throw new Error("Invalid credential type");
    }
    const protocol = new SDK2.Tasks.RunProtocol({
      type: "credential-request",
      pid: SDK2.ProtocolType.DidcommRequestCredential,
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
  return /* @__PURE__ */ React2.createElement(IssuerContext.Provider, { value: { agent, start, stop, state, createOOBOffer, issueCredential } }, children);
}
function createAgentProvider(options) {
  const { seed, resolverUrl, mediatorDID, resolvers } = options;
  return function AgentProvider({ children }) {
    const apollo = useApollo();
    const { db } = useRIDB2();
    const store = createStore({ db, storageType: StorageType.IndexDB });
    const pluto = useMemo(() => new SDK2.Pluto(store, apollo), [store, apollo]);
    const [agent, setAgent] = useState2(null);
    const [state, setState] = useState2(SDK2.Domain.Startable.State.STOPPED);
    const stop = useCallback2(async () => {
      setState(SDK2.Domain.Startable.State.STOPPING);
      try {
        await agent?.connections.stop();
        await agent?.jobs.stop();
        setState(SDK2.Domain.Startable.State.STOPPED);
      } catch (error) {
        console.log("Error stopping agent:", error);
      } finally {
        setAgent(null);
      }
    }, [agent, setState, setAgent]);
    const start = useCallback2(async (startOptions) => {
      if (!db) {
        throw new Error("No db found");
      }
      await db.start(startOptions);
      setState(SDK2.Domain.Startable.State.STARTING);
      const apollo2 = new SDK2.Apollo();
      if (resolverUrl) {
        resolvers.push(createResolver(resolverUrl));
      }
      const castor = new SDK2.Castor(apollo2, resolvers);
      const agent2 = await SDK2.Agent.initialize({
        apollo: apollo2,
        castor,
        mediatorDID,
        pluto,
        seed
      });
      await agent2.start();
      setState(SDK2.Domain.Startable.State.RUNNING);
      setAgent(agent2);
    }, [db, pluto]);
    return /* @__PURE__ */ React2.createElement(AgentContext.Provider, { value: { agent, setAgent, start, stop, state } }, children);
  };
}

// src/provider/Connections.tsx
import React3, { useCallback as useCallback3, useEffect as useEffect2, useState as useState3 } from "react";
import SDK3 from "@hyperledger/identus-sdk";
import { useRIDB as useRIDB3 } from "@trust0/ridb-react";
function ConnectionsProvider({ children }) {
  const { agent } = useAgent();
  const { db, state: dbState } = useRIDB3();
  const [connections, setConnections] = useState3([]);
  useEffect2(() => {
    if (db && dbState === "loaded") {
      agent?.pluto.getAllDidPairs().then(setConnections);
    }
  }, [agent, db, dbState]);
  const deleteConnection = useCallback3(async (connection) => {
    if (!hasDB(db) || dbState !== "loaded") {
      throw new Error("Database not connected");
    }
    const connections2 = await db.collections["did-link"].find({
      $or: [
        { role: SDK3.Domain.Models.DIDLink.role.pair, hostId: connection.host.toString() },
        { role: SDK3.Domain.Models.DIDLink.role.pair, targetId: connection.receiver.toString() }
      ]
    });
    for (const connection2 of connections2) {
      await db.collections["did-link"].delete(connection2.uuid);
    }
  }, [db, dbState]);
  return /* @__PURE__ */ React3.createElement(ConnectionsContext.Provider, { value: { connections, deleteConnection } }, children);
}

// src/provider/Credentials.tsx
import React4, { useCallback as useCallback4, useEffect as useEffect3, useState as useState4 } from "react";
import { useRIDB as useRIDB4 } from "@trust0/ridb-react";
function CredentialsProvider({ children }) {
  const { agent } = useAgent();
  const { db, state: dbState } = useRIDB4();
  const [credentials, setCredentials] = useState4([]);
  useEffect3(() => {
    agent?.pluto.getAllCredentials().then(setCredentials);
  }, [agent]);
  const deleteCredential = useCallback4(async (credential) => {
    if (!hasDB(db) || dbState !== "loaded") {
      throw new Error("Database not connected");
    }
    await db.collections.credentials.delete(credential.uuid);
  }, [db, dbState]);
  return /* @__PURE__ */ React4.createElement(CredentialsContext.Provider, { value: { credentials, deleteCredential } }, children);
}
export {
  ConnectionsProvider,
  CredentialsProvider,
  HolderProvider,
  IssuerProvider,
  MessagesProvider,
  VerifierProvider,
  WithAgentProvider,
  createAgentProvider
};
