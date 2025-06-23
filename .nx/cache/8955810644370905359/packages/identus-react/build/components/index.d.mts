import React__default from 'react';
import SDK from '@hyperledger/identus-sdk';

declare function Credential(props: {
    credential: SDK.Domain.Credential;
}): React__default.JSX.Element;

declare function MessageTitle(props: {
    message: SDK.Domain.Message;
    title: string;
}): React__default.JSX.Element;

declare const InputFields: React__default.FC<{
    fields: any[];
}>;

declare function CredentialDisplay(props: {
    message: SDK.Domain.Message;
}): React__default.JSX.Element;

declare function CredentialRequest(props: {
    message: SDK.Domain.Message;
}): React__default.JSX.Element | null;

declare function BasicMessage(props: {
    message: SDK.Domain.Message;
}): React__default.JSX.Element;

declare function ConnectionRequest(props: {
    message: SDK.Domain.Message;
}): React__default.JSX.Element;

declare function ConnectionResponse(props: {
    message: SDK.Domain.Message;
}): React__default.JSX.Element;

declare function OfferCredential(props: {
    message: SDK.Domain.Message;
}): React__default.JSX.Element;

declare function DefaultMessage(props: {
    message: SDK.Domain.Message;
}): React__default.JSX.Element;

declare function Message({ message }: {
    message: SDK.Domain.Message;
}): React__default.JSX.Element;

export { BasicMessage, ConnectionRequest, ConnectionResponse, Credential, CredentialDisplay, CredentialRequest, DefaultMessage, InputFields, Message, MessageTitle, OfferCredential };
