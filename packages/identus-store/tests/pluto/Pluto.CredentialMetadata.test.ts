import { describe, expect, test, beforeEach } from 'vitest';
import SDK from "@hyperledger/identus-sdk";

import { createInstance } from '../mocks/pluto';

describe("Pluto", () => {
  let instance: SDK.Domain.Pluto;

  beforeEach(async () => {
    const apollo = new SDK.Apollo();
    const pluto = createInstance({ apollo }).pluto;
    instance = pluto;

    await instance.start();
  });

  describe("CredentialMetadata", () => {
    test("uuid set on Domain instance - same after store", async () => {
      const sut = new SDK.Domain.CredentialMetadata(SDK.Domain.CredentialType.JWT, "mock", { mock: 123 });
      const uuid = sut.uuid;
      expect(uuid).to.be.a.string;

      await instance.storeCredentialMetadata(sut);
      expect(sut.uuid).to.be.a.string;
      expect(sut.uuid).to.eql(uuid);
    });

    test("Retrieved should match Stored", async () => {
      const name = "mock";
      const sutIn = new SDK.Domain.CredentialMetadata(SDK.Domain.CredentialType.JWT, name, { mock: 123 });

      await instance.storeCredentialMetadata(sutIn);
      const sutOut = await instance.getCredentialMetadata(name);

      expect(sutOut).to.be.instanceOf(SDK.Domain.CredentialMetadata);
      expect(sutOut?.name).to.eql(sutIn.name);
      expect(sutOut?.type).to.eql(sutIn.type);
      expect(sutOut?.toJSON()).to.eql(sutIn.toJSON());
    });
  });
});
