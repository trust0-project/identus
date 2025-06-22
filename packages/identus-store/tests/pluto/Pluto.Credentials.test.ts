import { describe, expect, test, beforeEach } from 'vitest';
import SDK from "@hyperledger/identus-sdk";

import * as Fixtures from "../fixtures";
import { createInstance } from '../mocks/pluto';

describe("Pluto", () => {
  let instance: SDK.Domain.Pluto;

  beforeEach(async () => {
    const apollo = new SDK.Apollo();
    const pluto = createInstance({ apollo }).pluto;
    instance = pluto;

    await instance.start();
  });

  describe("Credentials", () => {
    describe("JWT", () => {
      test("uuid set on Domain instance - same after store", async () => {

        const sut = SDK.JWTCredential.fromJWS(Fixtures.Credentials.JWT.credentialPayloadEncoded)
        const uuid = sut.uuid;
        expect(uuid).to.be.a.string;

        await instance.storeCredential(sut);
        expect(sut.uuid).to.be.a.string;
        expect(sut.uuid).to.eql(uuid);
      });

      test("Retrieved should match Stored", async () => {
        const credentialIn = SDK.JWTCredential.fromJWS(Fixtures.Credentials.JWT.credentialPayloadEncoded)

        await instance.storeCredential(credentialIn);
        const data = await instance.getAllCredentials();

        const credentialOut = data[0];
        expect(data).not.empty;
        expect(credentialOut).to.be.instanceOf(SDK.JWTCredential);
        expect(credentialOut.claims).to.eql(credentialIn.claims);
        expect(credentialOut.id).to.eql(Fixtures.Credentials.JWT.credentialPayloadEncoded);
        expect(credentialOut.id).to.eql(credentialIn.id);
        expect(credentialOut.issuer).to.eql(credentialIn.issuer);
        expect(credentialOut.recoveryId).to.eql(credentialIn.recoveryId);
        expect(credentialOut.subject).to.eql(credentialIn.subject);

        const jwtCred = credentialOut as SDK.JWTCredential;
        expect(jwtCred.audience).to.eql(credentialIn.audience);
        expect(jwtCred.context).to.eql(credentialIn.context);
        expect(jwtCred.credentialSchema).to.eql(credentialIn.credentialSchema);
        expect(jwtCred.credentialStatus).to.eql(credentialIn.credentialStatus);
        expect(jwtCred.credentialSubject).to.eql(credentialIn.credentialSubject);
        expect(jwtCred.credentialType).to.eql(credentialIn.credentialType);
        expect(jwtCred.evidence).to.eql(credentialIn.evidence);
        expect(jwtCred.expirationDate?.toString()).to.eql(credentialIn.expirationDate?.toString());
        expect(jwtCred.expirationDate).to.eql(credentialIn.expirationDate);
        expect(jwtCred.issuer).to.eql(credentialIn.issuer);
        expect(jwtCred.issuanceDate).to.eql(credentialIn.issuanceDate);
        expect(jwtCred.id).to.eql(credentialIn.id);
        expect(jwtCred.issuanceDate.toString()).to.eql(credentialIn.issuanceDate.toString());
        expect(jwtCred.refreshService).to.eql(credentialIn.refreshService);
        expect(jwtCred.subject).to.eql(credentialIn.subject);
        expect(jwtCred.termsOfUse).to.eql(credentialIn.termsOfUse);
        expect(jwtCred.type).to.eql(credentialIn.type);
        expect(jwtCred.vc).to.deep.eq(credentialIn.vc);
      });
    });

    describe("Anoncreds", () => {
      test("uuid set on Domain instance - same after store", async () => {
        const sut = new SDK.AnonCredsCredential(Fixtures.Credentials.Anoncreds.credential);
        const uuid = sut.uuid;
        expect(uuid).to.be.a.string;

        await instance.storeCredential(sut);
        expect(sut.uuid).to.be.a.string;
        expect(sut.uuid).to.eql(uuid);
      });

      test("Retrieved should match Stored", async () => {
        const credentialIn = new SDK.AnonCredsCredential(Fixtures.Credentials.Anoncreds.credential);

        await instance.storeCredential(credentialIn);
        const data = await instance.getAllCredentials();

        const credentialOut = data[0];
        expect(data).not.empty;
        expect(credentialOut).to.be.instanceOf(SDK.AnonCredsCredential);
        expect(credentialOut.claims).to.deep.eq(credentialIn.claims);
        expect(credentialOut.id).to.eq(credentialIn.id);
        expect(credentialOut.issuer).to.eq(credentialIn.issuer);
        expect(credentialOut.recoveryId).to.eq(credentialIn.recoveryId);
        expect(credentialOut.subject).to.eq(credentialIn.subject);

        const acCred = credentialOut as SDK.AnonCredsCredential;
        expect(acCred.credentialDefinitionId).to.eq(credentialIn.credentialDefinitionId);
        expect(acCred.credentialType).to.eq(credentialIn.credentialType);
        expect(acCred.schemaId).to.eq(credentialIn.schemaId);
      });
    });
  });
});
