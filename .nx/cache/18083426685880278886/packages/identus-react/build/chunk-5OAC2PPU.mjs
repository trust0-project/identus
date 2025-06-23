// src/resolver/index.ts
import SDK from "@hyperledger/identus-sdk";
function createResolver(baseUrl) {
  return class {
    method = "prism";
    async resolve(didString) {
      const url = baseUrl.replace(/\/$/, "") + "/" + didString;
      const response = await fetch(url, {
        "headers": {
          "accept": "*/*",
          "accept-language": "en",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "sec-gpc": "1"
        },
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const didDocument = data;
      const servicesProperty = new SDK.Domain.DIDDocument.Services(
        didDocument.service ?? []
      );
      const verificationMethodsProperty = new SDK.Domain.DIDDocument.VerificationMethods(
        didDocument.verificationMethod ?? []
      );
      const coreProperties = [];
      const authenticate = [];
      const assertion = [];
      for (const verificationMethod of didDocument.verificationMethod) {
        const isAssertion = didDocument.assertionMethod?.find((method) => method === verificationMethod.id);
        if (isAssertion) {
          assertion.push(new SDK.Domain.DIDDocument.AssertionMethod([isAssertion], [verificationMethod]));
        }
        const isAuthentication = didDocument.authentication?.find((method) => method === verificationMethod.id);
        if (isAuthentication) {
          authenticate.push(new SDK.Domain.DIDDocument.Authentication([isAuthentication], [verificationMethod]));
        }
      }
      coreProperties.push(...authenticate);
      coreProperties.push(...assertion);
      if (servicesProperty.values.length > 0) {
        coreProperties.push(servicesProperty);
      }
      if (verificationMethodsProperty.values.length > 0) {
        coreProperties.push(verificationMethodsProperty);
      }
      const resolved = new SDK.Domain.DIDDocument(
        SDK.Domain.DID.fromString(didString),
        coreProperties
      );
      return resolved;
    }
  };
}

export {
  createResolver
};
