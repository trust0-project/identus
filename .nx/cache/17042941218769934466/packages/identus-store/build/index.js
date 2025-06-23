"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createStore: () => createStore
});
module.exports = __toCommonJS(index_exports);
var createStore = (options) => {
  const { db, password, storageType } = options;
  const parseName = (collectionName) => {
    const name = String(collectionName).replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    if (!db.collections[name]) {
      throw new Error(`Collection ${String(name)} does not exist`);
    }
    return name;
  };
  return {
    async query(table, query) {
      const collectionName = parseName(table);
      const collection = db.collections[collectionName];
      const ridbQuery = query?.selector || query || {};
      return collection.find(ridbQuery);
    },
    async insert(table, model) {
      const collectionName = parseName(table);
      const collection = db.collections[collectionName];
      await collection.create(model);
    },
    async update(table, model) {
      const collectionName = parseName(table);
      const collection = db.collections[collectionName];
      await collection.update(model);
    },
    async delete(table, uuid) {
      const collectionName = parseName(table);
      const collection = db.collections[collectionName];
      await collection.delete(uuid);
    },
    async start() {
      if (!db.started) {
        await db.start({ storageType, password });
      }
    },
    async stop() {
      await db.close();
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createStore
});
