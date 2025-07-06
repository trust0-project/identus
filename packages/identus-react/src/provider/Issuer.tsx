import React, { useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { base64 } from 'multiformats/bases/base64';
import SDK from "@hyperledger/identus-sdk";
import { IssuerContext } from "../context";
import { useAgent, useDatabase, useMessages, usePeerDID } from "../hooks";


type Claim = {
    id: string;
    name: string;
    value: string;
    type: string;
    isValid?: boolean;
};

type UseDatabase = ReturnType<typeof useDatabase>;
type IssuanceFlow = Awaited<ReturnType<UseDatabase["getIssuanceFlow"]>>;
type Request = IssuanceFlow extends infer T ? T extends null ? never : T : never;


export function IssuerProvider({ children }: { children: React.ReactNode }) {
    const { agent, start, stop, state } = useAgent();
    const { getMessages } = useMessages();
    const { create: createPeerDID } = usePeerDID();

    const getOOBURL = useCallback(async (request: Request) => {
        if (!agent) return null;
        const peerDID = await createPeerDID();
        const {claims} = request;
        const attributes = claims.map((claim) => ({ name: claim.name, value: claim.value }));
        const oobTask = new SDK.Tasks.CreateOOBOffer({
            from: peerDID,
            offer: new SDK.OfferCredential(
                {
                    goal_code: "Offer Credential",
                    credential_preview: {
                        type: SDK.ProtocolType.DidcommCredentialPreview,
                        body: {  attributes },
                    },
                },
                [
                    new SDK.Domain.AttachmentDescriptor(
                        {
                            json: {
                                id: crypto.randomUUID(),
                                media_type: "application/json",
                                options: {
                                    challenge: crypto.randomUUID(),
                                    domain: window.location.origin || "domain",
                                },
                                thid: request.id,
                                presentation_definition: {
                                    id: crypto.randomUUID(),
                                    input_descriptors: [],
                                    format: {
                                        jwt: {
                                            alg: [
                                                SDK.Domain.JWT_ALG.EdDSA
                                            ],
                                            proof_type: [],
                                        },
                                    },
                                },
                                format: request.credentialFormat,
                            },
                        },
                        "application/json",
                        request.id,
                        undefined,
                        request.credentialFormat
                    )
                ],
                undefined,
                undefined,
                request.id
            )
        });
        const oob = await agent.runTask(oobTask);
        return `${window.location.href}?oob=${oob}`;
    }, [agent, createPeerDID]);

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
    return <IssuerContext.Provider value={{ agent, start, stop, state, createOOBOffer, issueCredential, getOOBURL}}>
        {children}
    </IssuerContext.Provider>
}
