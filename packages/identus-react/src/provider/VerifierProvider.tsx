

import React, { useCallback } from "react";
import SDK from "@hyperledger/identus-sdk";

import {  VerifierContext } from "../context";
import { useAgent, useMessages } from "../hooks";


export function VerifierProvider({ children }: { children: React.ReactNode }) {
    const { agent, start, stop, state } = useAgent();
    const { getMessages } = useMessages();
    const issuePresentationRequest = useCallback(async <T extends SDK.Domain.CredentialType>(type: T, toDID: SDK.Domain.DID, claims: SDK.Domain.PresentationClaims<T>) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        const task = new SDK.Tasks.CreatePresentationRequest({ type, toDID, claims })
        const requestPresentation = await agent.runTask(task);
        const requestPresentationMessage = requestPresentation.makeMessage();
        await agent.send(requestPresentationMessage);
        await getMessages()
    }, [agent]);
    const verifyPresentation = useCallback(async (presentation: SDK.Domain.Message): Promise<boolean> => {
        if (!agent) {
            throw new Error("No agent found");
        }
        if (presentation.piuri !== SDK.ProtocolType.DidcommRequestPresentation) {
            throw new Error("Invalid presentation type");
        }
        const response =await agent.handle(presentation)
        await getMessages()
        return response
    }, [agent]);
    return <VerifierContext.Provider value={{ agent, start, stop, state, issuePresentationRequest, verifyPresentation }}>
        {children}
    </VerifierContext.Provider>
}
