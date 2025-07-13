

import React, { useCallback } from "react";
import SDK from "@hyperledger/identus-sdk";

import { VerifierContext } from "../context";
import { useAgent, usePeerDID } from "../hooks";

export function VerifierProvider({ children }: { children: React.ReactNode }) {
    const { agent, start, stop, state } = useAgent();
    const { create: createPeerDID } = usePeerDID();

    const createRequestPresentationMessage = useCallback(async <T extends SDK.Domain.CredentialType>(
        type: T,
        claims: SDK.Domain.PresentationClaims<T>,
        toDID?: SDK.Domain.DID,
    ) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        const peerDID = await createPeerDID();
        let task: SDK.Utils.Task<any>;
        
        if ("issuer" in claims) {
            claims.claims.iss = {
                type: "string",
                pattern: claims.issuer
            }
            task = new SDK.Tasks.CreatePresentationRequest({ 
                type, 
                toDID: toDID ?? peerDID, 
                claims:{
                    claims: claims.claims
                }
            })
        } else if ("claims" in claims) {
            task = new SDK.Tasks.CreatePresentationRequest({ 
                type, 
                toDID: toDID ?? peerDID, 
                claims: {
                    claims: claims.claims
                }
            })
        } else {
            task = new SDK.Tasks.CreatePresentationRequest({ 
                type, 
                toDID: toDID ?? peerDID, 
                claims:claims
            })
        }
        const requestPresentation = await agent.runTask<SDK.RequestPresentation>(task);
        const requestPresentationMessage = requestPresentation.makeMessage();
        if (!toDID) {
            delete (requestPresentationMessage as any).to;
        }
        return requestPresentationMessage;
    }, [agent]);

    const issuePresentationRequest = useCallback(async <T extends SDK.Domain.CredentialType>(type: T, toDID: SDK.Domain.DID, claims: SDK.Domain.PresentationClaims<T>) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        const requestPresentationMessage = await createRequestPresentationMessage(type, claims, toDID);
        requestPresentationMessage.direction = SDK.Domain.MessageDirection.SENT;
        await agent.send(requestPresentationMessage);
    }, [agent, createRequestPresentationMessage]);

    const issueOOBPresentationRequest = useCallback(async <T extends SDK.Domain.CredentialType>(type: T, claims: SDK.Domain.PresentationClaims<T>) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        const peerDID = await createPeerDID();
        const requestPresentationMessage = await createRequestPresentationMessage(type, claims);
        requestPresentationMessage.direction = SDK.Domain.MessageDirection.SENT;
        await agent.pluto.storeMessage(requestPresentationMessage);
        const oob = new SDK.OutOfBandInvitation(
            {
                goal_code: "verify-vc",
                goal: "Verify Credential",
                accept: [
                    "didcomm/v2"
                ]
            },
            peerDID.toString(),
            requestPresentationMessage.thid,
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
        if (presentation.piuri !== SDK.ProtocolType.DidcommPresentation) {
            throw new Error("Invalid presentation type");
        }
        const response = await agent.handle(presentation)
        return response
    }, [agent]);

    return <VerifierContext.Provider value={{ agent, start, stop, state, issuePresentationRequest, verifyPresentation, issueOOBPresentationRequest }}>
        {children}
    </VerifierContext.Provider>
}
