

import React, { useCallback } from "react";
import SDK from "@hyperledger/identus-sdk";

import {  VerifierContext } from "../context";
import { useAgent, useMessages, usePeerDID } from "../hooks";

export function VerifierProvider({ children }: { children: React.ReactNode }) {
    const { agent, start, stop, state } = useAgent();
    const { getMessages } = useMessages();
    const { create: createPeerDID } = usePeerDID();

    const createRequestPresentationMessage = useCallback(async <T extends SDK.Domain.CredentialType>(
        type: T, 
        toDID: SDK.Domain.DID, 
        claims: SDK.Domain.PresentationClaims<T>,
    )=> {
        if (!agent) {
            throw new Error("No agent found");
        }
        const task = new SDK.Tasks.CreatePresentationRequest({ type, toDID, claims })
        const requestPresentation = await agent.runTask(task);
        return requestPresentation.makeMessage();
    }, [agent]);

    const issuePresentationRequest = useCallback(async <T extends SDK.Domain.CredentialType>(type: T, toDID: SDK.Domain.DID, claims: SDK.Domain.PresentationClaims<T>) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        const requestPresentationMessage = await createRequestPresentationMessage(type, toDID, claims);
        await agent.send(requestPresentationMessage);
    }, [agent, createRequestPresentationMessage]);

    const issueOOBPresentationRequest = useCallback(async <T extends SDK.Domain.CredentialType>(type: T, toDID: SDK.Domain.DID, claims: SDK.Domain.PresentationClaims<T>) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        const uuid = crypto.randomUUID();
        const peerDID = await createPeerDID();
        const requestPresentationMessage = await createRequestPresentationMessage(type, toDID, claims);
        const oob = new SDK.OutOfBandInvitation(
            {
                goal_code: "verify-vc",
                goal: "Verify Credential",
                accept:[
                    "didcomm/v2"
                ]
            },
            peerDID.toString(),
            uuid,
            [
                new SDK.Domain.AttachmentDescriptor(
                    {
                        json: requestPresentationMessage
                    },
                    "application/json",
                )
            ] 
        )
        return Buffer.from(JSON.stringify(oob)).toString("base64")
    }, [agent, createPeerDID, createRequestPresentationMessage]);

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
    return <VerifierContext.Provider value={{ agent, start, stop, state, issuePresentationRequest, verifyPresentation,issueOOBPresentationRequest }}>
        {children}
    </VerifierContext.Provider>
}
