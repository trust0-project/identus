import React from "react";
import SDK from "@hyperledger/identus-sdk";
import { useCallback } from "react";
import { HolderContext } from "../context";
import { useAgent, useMessages, useCredentials } from "../hooks";

export function HolderProvider({ children }: { children: React.ReactNode }) {
    const { agent, start, stop, state } = useAgent();
    const { getMessages } = useMessages();
    const { fetchCredentials } = useCredentials();
    const parseOOBOffer = useCallback((offer: string, selfPeerDID: SDK.Domain.DID) => {
        const message = SDK.Domain.Message.fromJson(offer);
        const attachment = message.attachments.at(0)?.payload;
        return SDK.Domain.Message.fromJson({
            ...attachment,
            from: message.from,
            to: selfPeerDID,
        })
    }, []);
    const handlePresentationRequest = useCallback(async (message: SDK.Domain.Message, credential: SDK.Domain.Credential) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        const request = SDK.RequestPresentation.fromMessage(message);
        const task = new SDK.Tasks.CreatePresentation({ request, credential })
        const presentation = await agent.runTask(task);
        const presentationMessage = presentation.makeMessage();
        await agent.send(presentationMessage);
        await getMessages()
    }, [agent]);
    const acceptOOBOffer = useCallback(async (offer: SDK.Domain.Message) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        const credentialOfferMessage = SDK.OfferCredential.fromMessage(offer);
        const requestCredential = await agent.handle(credentialOfferMessage.makeMessage());
        const requestMessage = requestCredential.makeMessage()
        await agent.send(requestMessage);
        await getMessages()
    }, [agent]);
    const acceptIssuedCredential = useCallback(async (message: SDK.Domain.Message) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        if (message.piuri !== SDK.ProtocolType.DidcommIssueCredential) {
            throw new Error("Message is not a credential issued message");
        }
        await agent.send(message);
        await fetchCredentials();
    }, [agent, fetchCredentials]);
    return <HolderContext.Provider value={{ agent, start, stop, state, parseOOBOffer, handlePresentationRequest, acceptOOBOffer, acceptIssuedCredential }}>
        {children}
    </HolderContext.Provider>
}