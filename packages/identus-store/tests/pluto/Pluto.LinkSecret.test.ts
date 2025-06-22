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

  describe("LinkSecret", () => {
    test("uuid set on Domain instance - same after store", async () => {
      const sut = new SDK.Domain.LinkSecret("test");
      const uuid = sut.uuid;
      expect(uuid).to.be.a.string;

      await instance.storeLinkSecret(sut);
      expect(sut.uuid).to.be.a.string;
      expect(sut.uuid).to.eql(uuid);
    });

    test("Retrieved should match Stored", async () => {
      const name = "mock";
      const secret = "123";
      const sutIn = new SDK.Domain.LinkSecret(secret, name);

      await instance.storeLinkSecret(sutIn);
      const sutOut = await instance.getLinkSecret(name);

      expect(sutOut).to.be.instanceOf(SDK.Domain.LinkSecret);
      expect(sutOut?.uuid).to.eql(sutIn.uuid);
      expect(sutOut?.name).to.eql(sutIn.name);
      expect(sutOut?.secret).to.eql(sutIn.secret);
    });
  });
});
