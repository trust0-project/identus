import {
  useAgent,
  useIssuer,
  useMessages
} from "../chunk-IFEJ6KWH.mjs";
import "../chunk-RLWLUO6Q.mjs";

// src/components/Credential.tsx
import React, { useState } from "react";
function protect(credential) {
  const newClaims = [];
  credential.claims.forEach((claim) => {
    const newClaim = {};
    Object.keys(claim).forEach((key) => {
      newClaim[key] = "******";
    });
    newClaims.push(newClaim);
  });
  return newClaims;
}
function Credential(props) {
  const { credential } = props;
  const { agent } = useAgent();
  const [claims, setClaims] = useState(protect(credential));
  function revealAttributes(credential2, claimIndex, field) {
    agent?.pluto.getLinkSecret().then((linkSecret) => {
      agent?.revealCredentialFields(
        credential2,
        [field],
        linkSecret?.secret ?? ""
      ).then((revealedFields) => {
        const revealed = claims.map((claim, index) => {
          if (claimIndex === index) {
            return {
              ...claim,
              [field]: revealedFields[field]
            };
          }
          return claim;
        });
        setClaims(revealed);
      });
    });
  }
  const credentialType = credential.credentialType || "Digital Credential";
  return /* @__PURE__ */ React.createElement("div", { className: "w-full mt-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 backdrop-blur-sm rounded p-2" }, /* @__PURE__ */ React.createElement("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-base font-semibold text-white" }, credentialType), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-blue-100" }, "Verified Credential"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-1.5 h-1.5 bg-green-400 rounded-full" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-white" }, "Active")))), /* @__PURE__ */ React.createElement("div", { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "mb-4 pb-4 border-b border-gray-200 dark:border-gray-700" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, "Issued By"), /* @__PURE__ */ React.createElement("p", { className: "mt-0.5 text-sm font-medium text-gray-900 dark:text-white" }, credential.issuer)), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, claims.map((claim, claimIndex) => /* @__PURE__ */ React.createElement("div", { key: `claim-${claimIndex}`, className: "space-y-3" }, Object.keys(claim).filter((field) => field !== "id").map((field, i) => /* @__PURE__ */ React.createElement("div", { key: `field${claimIndex}-${i}`, className: "group" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, field.replace(/_/g, " ")), /* @__PURE__ */ React.createElement("div", { className: "mt-0.5 flex items-center space-x-2" }, claim[field] === "******" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-400 dark:text-gray-500" }, "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => revealAttributes(credential, claimIndex, field),
      className: "flex items-center space-x-1 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
    },
    /* @__PURE__ */ React.createElement("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })),
    /* @__PURE__ */ React.createElement("span", null, "Reveal")
  )) : /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-900 dark:text-white break-all" }, claim[field]))))))))), /* @__PURE__ */ React.createElement("div", { className: "mt-4 pt-3 border-t border-gray-200 dark:border-gray-700" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs text-gray-500 dark:text-gray-400" }, /* @__PURE__ */ React.createElement("span", null, "ID: ", credential.id.slice(0, 8), "..."), /* @__PURE__ */ React.createElement("span", null, credential.credentialType || "Standard"))))));
}

// src/components/messages/MessageTitle.tsx
import React2 from "react";
function MessageTitle(props) {
  const { message, title } = props;
  return /* @__PURE__ */ React2.createElement("div", { className: "text-xl font-bold" }, /* @__PURE__ */ React2.createElement("b", null, title, ": "), " ", message.id, " ", message.direction === 1 ? "received" : "sent");
}

// src/components/messages/InputFields.tsx
import React3 from "react";
var InputFields = (props) => {
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, "Should proof the following claims:", props.fields.map((field, i) => {
    return /* @__PURE__ */ React3.createElement("div", { key: `field${i}` }, /* @__PURE__ */ React3.createElement("p", { className: " text-sm font-normal text-gray-500 dark:text-gray-400" }, field.name, field.filter ? `must match ${JSON.stringify(field.filter)}` : ``));
  }));
};

// src/components/messages/CredentialDisplay.tsx
import React4 from "react";
import SDK from "@hyperledger/identus-sdk";
function CredentialDisplay(props) {
  const { message } = props;
  const attachments = message.attachments.reduce((acc, x) => {
    if (x.format === "prism/jwt") {
      return acc.concat(SDK.JWTCredential.fromJWS(x.payload));
    }
    if (x.format === "vc+sd-jwt") {
      return acc.concat(SDK.SDJWTCredential.fromJWS(x.payload));
    }
    try {
      const parsed2 = JSON.parse(x.payload);
      return acc.concat(parsed2);
    } catch (err) {
    }
    return acc;
  }, []);
  const attachment = attachments.at(0);
  const parsed = { ...message };
  if (typeof parsed.body === "string") {
    parsed.body = JSON.parse(parsed.body);
  }
  const format = message.attachments?.at(0)?.format;
  return /* @__PURE__ */ React4.createElement("div", { className: "w-full mt-5 p-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" }, /* @__PURE__ */ React4.createElement("div", { className: "pt-6 px-6" }, /* @__PURE__ */ React4.createElement(MessageTitle, { message, title: `Credential (${format})` })), /* @__PURE__ */ React4.createElement("div", { className: "p-0  space-y-6" }, /* @__PURE__ */ React4.createElement(Credential, { credential: attachment })));
}

// src/components/messages/CredentialRequest.tsx
import { useEffect, useState as useState2 } from "react";

// src/components/messages/utils.ts
import SDK2 from "@hyperledger/identus-sdk";
function useMessageStatus(message) {
  const { messages } = useMessages();
  const messageThid = messages.find(({ message: appMessage }) => {
    if (!message.thid || !appMessage.thid) {
      return false;
    }
    if (appMessage.id === message.id) {
      return false;
    }
    const messageCreatedTime = message.createdTime;
    const appMessageCreatedTime = appMessage.createdTime;
    return appMessage.thid === message.thid && messageCreatedTime < appMessageCreatedTime;
  });
  const hasResponse = messageThid?.message.direction === SDK2.Domain.MessageDirection.RECEIVED;
  const hasAnswered = messageThid?.message.direction === SDK2.Domain.MessageDirection.SENT;
  return {
    hasResponse,
    hasAnswered
  };
}

// src/components/messages/CredentialRequest.tsx
import { useRouter } from "next/router";
import React5 from "react";
function CredentialRequest(props) {
  const router = useRouter();
  const { message } = props;
  const { hasResponse, hasAnswered } = useMessageStatus(message);
  const { deleteMessage } = useMessages();
  const { agent, issueCredential } = useIssuer();
  const [loaded, setLoaded] = useState2(true);
  const [isAgent, setIsAgent] = useState2(true);
  const [isAnswering, setIsAnswering] = useState2(false);
  useEffect(() => {
    if (hasAnswered) {
      setIsAnswering(false);
    }
  }, [hasAnswered]);
  async function onAcceptCredentialRequest() {
  }
  async function onDeleteCredentialRequest() {
    await router.push("/app/messages");
    await deleteMessage(message);
  }
  if (!loaded) {
    return null;
  }
  const format = message.attachments.at(0)?.format;
  if (isAgent) {
    return /* @__PURE__ */ React5.createElement(
      "div",
      {
        className: "w-full mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
      },
      /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement(MessageTitle, { message, title: "Credential Request" }), /* @__PURE__ */ React5.createElement("p", null, "By clicking accept you will be issuing a ", format, " credential to the requester"), hasResponse && /* @__PURE__ */ React5.createElement("div", { className: "mt-5 p-4 bg-green-100 border border-green-400 text-green-700 rounded" }, /* @__PURE__ */ React5.createElement("p", { className: "font-medium" }, "Response already sent"), /* @__PURE__ */ React5.createElement("p", { className: "text-sm" }, "You have already issued a credential for this request.")), !hasResponse && /* @__PURE__ */ React5.createElement(React5.Fragment, null, isAnswering && /* @__PURE__ */ React5.createElement("div", { className: "mt-5 flex items-center" }, /* @__PURE__ */ React5.createElement("div", { role: "status" }, /* @__PURE__ */ React5.createElement("svg", { "aria-hidden": "true", className: "w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React5.createElement("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), /* @__PURE__ */ React5.createElement("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })), /* @__PURE__ */ React5.createElement("span", { className: "sr-only" }, "Loading...")), /* @__PURE__ */ React5.createElement("span", { className: "ml-3 text-gray-600 dark:text-gray-400" }, "Issuing credential...")), !isAnswering && /* @__PURE__ */ React5.createElement("div", { className: "mt-5 space-x-3" }, /* @__PURE__ */ React5.createElement(
        "button",
        {
          className: "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900",
          style: { width: 120 },
          onClick: onAcceptCredentialRequest
        },
        "Accept"
      ), /* @__PURE__ */ React5.createElement(
        "button",
        {
          className: "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900",
          style: { width: 120 },
          onClick: onDeleteCredentialRequest
        },
        "Delete"
      ))))
    );
  }
  return /* @__PURE__ */ React5.createElement(
    "div",
    {
      className: "w-full mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
    },
    /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement(MessageTitle, { message, title: "Credential Request" }), /* @__PURE__ */ React5.createElement("p", null, "You requested the Credential through this Credential Request Message of type ", format), hasResponse && /* @__PURE__ */ React5.createElement("div", { className: "mt-5 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded" }, /* @__PURE__ */ React5.createElement("p", { className: "font-medium" }, "Credential received"), /* @__PURE__ */ React5.createElement("p", { className: "text-sm" }, "The issuer has responded to your credential request.")), !hasResponse && isAnswering && /* @__PURE__ */ React5.createElement("div", { className: "mt-5 flex items-center" }, /* @__PURE__ */ React5.createElement("div", { role: "status" }, /* @__PURE__ */ React5.createElement("svg", { "aria-hidden": "true", className: "w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React5.createElement("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), /* @__PURE__ */ React5.createElement("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })), /* @__PURE__ */ React5.createElement("span", { className: "sr-only" }, "Loading...")), /* @__PURE__ */ React5.createElement("span", { className: "ml-3 text-gray-600 dark:text-gray-400" }, "Waiting for credential...")), /* @__PURE__ */ React5.createElement("div", { className: "mt-5" }, /* @__PURE__ */ React5.createElement(
      "button",
      {
        className: "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900",
        style: { width: 120 },
        onClick: onDeleteCredentialRequest
      },
      "Delete"
    )))
  );
}

// src/components/messages/BasicMessage.tsx
import React6 from "react";
import SDK3 from "@hyperledger/identus-sdk";
import { useEffect as useEffect2, useState as useState3 } from "react";
function BasicMessage(props) {
  const { message } = props;
  const { agent } = useAgent();
  const { hasResponse, hasAnswered } = useMessageStatus(message);
  const [response, setResponse] = useState3("");
  const [isAnswering, setIsAnswering] = useState3(false);
  useEffect2(() => {
    if (hasAnswered) {
      setIsAnswering(false);
    }
  }, [hasAnswered]);
  const parsed = { ...message };
  if (typeof parsed.body === "string") {
    parsed.body = JSON.parse(parsed.body);
  }
  const attachments = message.attachments.reduce((acc, x) => {
    if ("base64" in x.data) {
      if (x.format === "prism/jwt") {
        const decodedFirst = Buffer.from(x.data.base64, "base64").toString();
        const decoded2 = Buffer.from(decodedFirst.split(".")[1], "base64").toString();
        const parsed2 = JSON.parse(decoded2);
        return acc.concat(parsed2);
      }
      const decoded = Buffer.from(x.data.base64, "base64").toString();
      try {
        const parsed2 = JSON.parse(decoded);
        return acc.concat(parsed2);
      } catch (err) {
      }
    }
    return acc;
  }, []);
  const handleSend = async () => {
    setIsAnswering(true);
    const text = response;
    const from = message?.from;
    const to = message?.to;
    const thid = message?.thid || message?.id;
    try {
      if (!agent) {
        throw new Error("Start the agent first");
      }
      await agent.send(
        new SDK3.BasicMessage(
          { content: text },
          to,
          from,
          thid
        ).makeMessage()
      );
    } catch (e) {
      console.log(e);
    }
  };
  const isReceived = message.direction !== SDK3.Domain.MessageDirection.SENT;
  return /* @__PURE__ */ React6.createElement(
    "div",
    {
      className: "w-full mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
    },
    /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("b", null, "Basic Message: "), " ", message.id, " ", message.direction === 1 ? "received" : "sent", /* @__PURE__ */ React6.createElement("p", null, "from ", message.from?.toString()), /* @__PURE__ */ React6.createElement("p", null, "to ", message.to?.toString()), /* @__PURE__ */ React6.createElement(
      "pre",
      {
        style: {
          textAlign: "left",
          wordWrap: "break-word",
          wordBreak: "break-all",
          whiteSpace: "pre-wrap"
        }
      },
      JSON.stringify(parsed.body.content, null, 2)
    ), attachments.length > 0 && /* @__PURE__ */ React6.createElement(
      "pre",
      {
        style: {
          textAlign: "left",
          wordWrap: "break-word",
          wordBreak: "break-all",
          whiteSpace: "pre-wrap"
        }
      },
      /* @__PURE__ */ React6.createElement("b", null, "Attachments:"),
      attachments.map((x) => JSON.stringify(x, null, 2))
    )),
    isAnswering && /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement("div", { role: "status" }, /* @__PURE__ */ React6.createElement("svg", { "aria-hidden": "true", className: "w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React6.createElement("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), /* @__PURE__ */ React6.createElement("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })), /* @__PURE__ */ React6.createElement("span", { className: "sr-only" }, "Loading..."))),
    !isAnswering && isReceived && !hasResponse && /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement(
      "input",
      {
        className: "block mt-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
        type: "text",
        value: response,
        placeholder: "Your response",
        onChange: (e) => setResponse(e.target.value)
      }
    ), /* @__PURE__ */ React6.createElement("button", { className: "mt-5 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900", style: { width: 120 }, onClick: () => {
      handleSend();
    } }, "Respond"))
  );
}

// src/components/messages/ConnectionRequest.tsx
import React7 from "react";
function ConnectionRequest(props) {
  const { message } = props;
  const parsed = { ...message };
  if (typeof parsed.body === "string") {
    parsed.body = JSON.parse(parsed.body);
  }
  return /* @__PURE__ */ React7.createElement(
    "div",
    {
      className: "w-full mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
    },
    /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("b", null, "Connection Request: "), " ", message.id, " ", message.direction === 1 ? "received" : "sent", /* @__PURE__ */ React7.createElement(
      "pre",
      {
        style: {
          textAlign: "left",
          wordWrap: "break-word",
          wordBreak: "break-all",
          whiteSpace: "pre-wrap"
        }
      },
      JSON.stringify(parsed.body, null, 2)
    ))
  );
}

// src/components/messages/ConnectionResponse.tsx
import React8 from "react";
function ConnectionResponse(props) {
  const { message } = props;
  const parsed = { ...message };
  if (typeof parsed.body === "string") {
    parsed.body = JSON.parse(parsed.body);
  }
  return /* @__PURE__ */ React8.createElement(
    "div",
    {
      className: "w-full mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
    },
    /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("b", null, "Connection established: "), " ", message.id, " ", message.direction === 1 ? "received" : "sent", /* @__PURE__ */ React8.createElement(
      "pre",
      {
        style: {
          textAlign: "left",
          wordWrap: "break-word",
          wordBreak: "break-all",
          whiteSpace: "pre-wrap"
        }
      },
      JSON.stringify(parsed.body, null, 2)
    ))
  );
}

// src/components/messages/OfferCredential.tsx
import React9 from "react";
import SDK4 from "@hyperledger/identus-sdk";
import { useRouter as useRouter2 } from "next/router";
import { useEffect as useEffect3, useState as useState4 } from "react";
function OfferCredential(props) {
  const { message } = props;
  const { agent } = useAgent();
  const { hasResponse, hasAnswered } = useMessageStatus(message);
  const [isAnswering, setIsAnswering] = useState4(false);
  const router = useRouter2();
  const body = message.body;
  useEffect3(() => {
    if (hasAnswered) {
      setIsAnswering(false);
    }
  }, [hasAnswered]);
  const isReceived = message.direction !== SDK4.Domain.MessageDirection.SENT;
  async function onHandleAccept(message2) {
    if (!agent) {
      throw new Error("Start the agent first");
    }
    const credentialOffer = SDK4.OfferCredential.fromMessage(message2);
    const requestCredential = await agent.prepareRequestCredentialWithIssuer(credentialOffer);
    try {
      const requestMessage = requestCredential.makeMessage();
      await agent.send(requestMessage);
    } catch (err) {
      console.log("continue after err", err);
    }
  }
  return /* @__PURE__ */ React9.createElement(
    "div",
    {
      className: "w-full mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
    },
    /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement(
      "p",
      {
        className: " text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
      },
      /* @__PURE__ */ React9.createElement("b", null, "Credential Offer "),
      " ",
      message.id,
      " ",
      message.direction === 1 ? "received" : "sent"
    ), "Credential will contain the following fields", body.credential_preview.body.attributes.map((field, i) => {
      return /* @__PURE__ */ React9.createElement(
        "p",
        {
          key: `field${i}`,
          className: " text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
        },
        field.name,
        ": ",
        field.value
      );
    }), isReceived && !hasResponse && /* @__PURE__ */ React9.createElement(React9.Fragment, null, isAnswering && /* @__PURE__ */ React9.createElement(React9.Fragment, null, /* @__PURE__ */ React9.createElement("div", { role: "status" }, /* @__PURE__ */ React9.createElement("svg", { "aria-hidden": "true", className: "w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React9.createElement("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), /* @__PURE__ */ React9.createElement("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })), /* @__PURE__ */ React9.createElement("span", { className: "sr-only" }, "Loading..."))), !isAnswering && /* @__PURE__ */ React9.createElement(React9.Fragment, null, message?.error && /* @__PURE__ */ React9.createElement("p", null, JSON.stringify(message.error.message)), /* @__PURE__ */ React9.createElement(
      "button",
      {
        className: "mt-5 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900",
        style: { width: 120 },
        onClick: () => onHandleAccept(message)
      },
      "Accept"
    ), /* @__PURE__ */ React9.createElement("button", { className: "mt-5 mx-5 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900", style: { width: 120 }, onClick: () => {
      router.push("/app/credentials");
    } }, "Reject"))))
  );
}

// src/components/messages/DefaultMessage.tsx
import React10 from "react";
import SDK5 from "@hyperledger/identus-sdk";
function DefaultMessage(props) {
  const { message } = props;
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400" }, "Message ID"), /* @__PURE__ */ React10.createElement("p", { className: "text-sm font-mono break-all" }, message.id)), /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400" }, "Protocol URI"), /* @__PURE__ */ React10.createElement("p", { className: "text-sm font-mono break-all" }, message.piuri)), /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400" }, "From"), /* @__PURE__ */ React10.createElement("p", { className: "text-sm font-mono break-all" }, message.from?.toString() || "N/A")), /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400" }, "To"), /* @__PURE__ */ React10.createElement("p", { className: "text-sm font-mono break-all" }, message.to?.toString() || "N/A")), /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400" }, "Direction"), /* @__PURE__ */ React10.createElement("p", { className: "text-sm" }, message.direction === SDK5.Domain.MessageDirection.SENT ? "Sent" : "Received")), /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400" }, "Created Time"), /* @__PURE__ */ React10.createElement("p", { className: "text-sm" }, new Date(message.createdTime * 1e3).toLocaleString()))), /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400" }, "Message Body"), /* @__PURE__ */ React10.createElement("div", { className: "bg-gray-50 dark:bg-gray-900 p-4 rounded-lg" }, /* @__PURE__ */ React10.createElement("pre", { className: "text-sm font-mono whitespace-pre-wrap break-all" }, JSON.stringify(message.body, null, 2)))), message.attachments.length > 0 && /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400" }, "Attachments"), /* @__PURE__ */ React10.createElement("div", { className: "space-y-4" }, message.attachments.map((attachment, index) => /* @__PURE__ */ React10.createElement("div", { key: index, className: "bg-gray-50 dark:bg-gray-900 p-4 rounded-lg" }, /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React10.createElement("span", { className: "text-sm font-medium" }, "Attachment ", index + 1), attachment.mediaType && /* @__PURE__ */ React10.createElement("span", { className: "text-xs text-gray-500" }, attachment.mediaType)), attachment.description && /* @__PURE__ */ React10.createElement("p", { className: "text-sm text-gray-600 dark:text-gray-400" }, attachment.description), attachment.filename && /* @__PURE__ */ React10.createElement("p", { className: "text-sm font-mono" }, attachment.filename)))))), Object.keys(message.extraHeaders).length > 0 && /* @__PURE__ */ React10.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React10.createElement("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400" }, "Extra Headers"), /* @__PURE__ */ React10.createElement("div", { className: "bg-gray-50 dark:bg-gray-900 p-4 rounded-lg" }, /* @__PURE__ */ React10.createElement("pre", { className: "text-sm font-mono whitespace-pre-wrap break-all" }, JSON.stringify(message.extraHeaders, null, 2)))));
}

// src/components/messages/Message.tsx
import React11 from "react";
import SDK6 from "@hyperledger/identus-sdk";
function Message({ message }) {
  if (message.piuri === SDK6.ProtocolType.DidcommBasicMessage) {
    return /* @__PURE__ */ React11.createElement(BasicMessage, { message });
  }
  if (message.piuri === SDK6.ProtocolType.DidcommConnectionRequest) {
    return /* @__PURE__ */ React11.createElement(ConnectionRequest, { message });
  }
  if (message.piuri === SDK6.ProtocolType.DidcommConnectionResponse) {
    return /* @__PURE__ */ React11.createElement(ConnectionResponse, { message });
  }
  if (message.piuri === SDK6.ProtocolType.DidcommRequestCredential) {
    return /* @__PURE__ */ React11.createElement(CredentialRequest, { message });
  }
  if (message.piuri === SDK6.ProtocolType.DidcommIssueCredential) {
    return /* @__PURE__ */ React11.createElement(CredentialDisplay, { message });
  }
  if (message.piuri === SDK6.ProtocolType.DidcommOfferCredential) {
    return /* @__PURE__ */ React11.createElement(OfferCredential, { message });
  }
  return /* @__PURE__ */ React11.createElement(DefaultMessage, { message });
}
export {
  BasicMessage,
  ConnectionRequest,
  ConnectionResponse,
  Credential,
  CredentialDisplay,
  CredentialRequest,
  DefaultMessage,
  InputFields,
  Message,
  MessageTitle,
  OfferCredential
};
