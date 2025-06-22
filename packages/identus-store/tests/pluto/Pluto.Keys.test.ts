import {  describe,  expect, test, beforeEach } from 'vitest';
import * as Fixtures from "../fixtures";
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

  describe("Keys", () => {
    test("uuid set on Domain instance - same after store", async () => {
      const sut = new SDK.X25519PrivateKey(Fixtures.Keys.x25519.privateKey.raw);
      const uuid = sut.uuid;
      expect(uuid).to.be.a.string;

      await instance.storePrivateKey(sut);
      expect(sut.uuid).to.be.a.string;
      expect(sut.uuid).to.eql(uuid);
    });
  });
});
