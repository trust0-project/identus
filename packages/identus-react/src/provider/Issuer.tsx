import React, { useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { base64 } from 'multiformats/bases/base64';
import SDK from "@hyperledger/identus-sdk";
import { IssuerContext } from "../context";
import { useAgent, useMessages } from "../hooks";

export function IssuerProvider({ children }: { children: React.ReactNode }) {
    const { agent, start, stop, state } = useAgent();
    const { getMessages } = useMessages();
    const createOOBOffer = useCallback(async <T extends SDK.Domain.CredentialType>(type: T, id: string, claims: any) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        if (type !== SDK.Domain.CredentialType.JWT && type !== SDK.Domain.CredentialType.SDJWT) {
            throw new Error("Invalid credential type");
        }
        const peerDID = await agent.createNewPeerDID();
        const oobTask = new SDK.Tasks.CreateOOBOffer({
            from: peerDID,
            offer: new SDK.OfferCredential(
                {
                    goal_code: "Offer Credential",
                    credential_preview: {
                        type: SDK.ProtocolType.DidcommCredentialPreview,
                        body: {
                            attributes: claims as any,
                        },
                    },
                },
                [
                    new SDK.Domain.AttachmentDescriptor(
                        {
                            json: {
                                id: uuidv4(),
                                media_type: "application/json",
                                options: {
                                    challenge: uuidv4(),
                                    domain: 'localhost',
                                },
                                thid: id,
                                presentation_definition: {
                                    id: uuidv4(),
                                    input_descriptors: [],
                                    format: {
                                        jwt: {
                                            alg: ["ES256K"],
                                            proof_type: [],
                                        },
                                    },
                                },
                                format: type,
                                piuri: SDK.ProtocolType.DidcommOfferCredential,
                            },
                        },
                        "application/json",
                        id,
                        undefined,
                        type
                    )
                ],
                undefined,
                undefined,
                id
            )
        });
        const oob = await agent.runTask(oobTask);
        const oobDecoded = base64.baseDecode(oob);
        const oobJson = Buffer.from(oobDecoded).toString();
        return oobJson;
    }, [agent]);
    const issueCredential = useCallback(async <T extends SDK.Domain.CredentialType>(type: T, message: SDK.Domain.Message, claims: SDK.Domain.PresentationClaims<T>, issuerDID: SDK.Domain.DID, holderDID: SDK.Domain.DID) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        if (type !== SDK.Domain.CredentialType.JWT && type !== SDK.Domain.CredentialType.SDJWT) {
            throw new Error("Invalid credential type");
        }
        const protocol = new SDK.Tasks.RunProtocol({
            type: 'credential-request',
            pid: SDK.ProtocolType.DidcommRequestCredential,
            data: {
                issuerDID,
                holderDID,
                message,
                format: type,
                claims: claims as any,
            }
        })
        const issued = await agent.runTask(protocol);
        await agent.send(issued.makeMessage());
        await getMessages()
    }, [agent]);
    return <IssuerContext.Provider value={{ agent, start, stop, state, createOOBOffer, issueCredential }}>
        {children}
    </IssuerContext.Provider>
}
