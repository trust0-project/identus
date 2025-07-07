import React from "react";
import SDK from "@hyperledger/identus-sdk";
import { useCallback } from "react";
import { HolderContext } from "../context";
import { useAgent, useMessages, useCredentials, usePeerDID } from "../hooks";
import { base64 } from "multiformats/bases/base64";

export function HolderProvider({ children }: { children: React.ReactNode }) {
    const { agent, start, stop, state } = useAgent();
    const { getMessages } = useMessages();
    const { fetchCredentials } = useCredentials();

    const { peerDID, create: createPeerDID } = usePeerDID();

    const parseOOBOffer = useCallback(async (url: string) => {
        let parsedUrl: URL;
        try {
            parsedUrl = new URL(url);
        } catch (error) {
            parsedUrl = new URL(window.location.href);
        }
        const oob = parsedUrl.searchParams.get('oob');
        const selfPeerDID = peerDID ? peerDID : await createPeerDID();
        const decoded = base64.baseDecode(oob as string);
        const offer = Buffer.from(decoded).toString()
        const message = SDK.Domain.Message.fromJson(offer);
        const attachment = message.attachments.at(0)?.payload;
        return SDK.Domain.Message.fromJson({
            ...attachment,
            from: message.from,
            to: selfPeerDID,
        })
    }, [peerDID, createPeerDID]);

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
            throw new Error("Start the agent first");
        }
        const credentialOffer = SDK.OfferCredential.fromMessage(offer);
        const requestCredential = await agent.prepareRequestCredentialWithIssuer(credentialOffer);
        try {
            const requestMessage = requestCredential.makeMessage()
            await agent.send(requestMessage);
        } catch (err) {
            console.log("continue after err", err);
        }
        await getMessages()
    }, [agent]);
    const acceptIssuedCredential = useCallback(async (message: SDK.Domain.Message) => {
        if (!agent) {
            throw new Error("No agent found");
        }
        if (message.piuri !== SDK.ProtocolType.DidcommIssueCredential) {
            throw new Error("Message is not a credential issued message");
        }
        const protocol = new SDK.Tasks.RunProtocol({
            type: 'credential-issue',
            pid: SDK.ProtocolType.DidcommIssueCredential,
            //Types are wrong on TS SDK, must fix there
            data: {
                message: message
            } as any
        });
        const credential = await agent.runTask(protocol);  
        const existingCredentials = await fetchCredentials();
        const existingCredential = existingCredentials.find(({uuid, id}) => {
            return uuid === credential.uuid || id === credential.id
        })
        if (existingCredential) {
            //Credential already exists, return it
            return existingCredential;
        }
        //Credential does not exist, process the message to generate the credential
        await agent.handle(message);
        // sync Credentials
        await fetchCredentials();
        return credential;
    }, [agent, fetchCredentials]);

    return <HolderContext.Provider value={{ agent, start, stop, state, parseOOBOffer, handlePresentationRequest, acceptOOBOffer, acceptIssuedCredential }}>
        {children}
    </HolderContext.Provider>
}