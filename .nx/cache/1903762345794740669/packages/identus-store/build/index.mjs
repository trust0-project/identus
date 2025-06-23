// src/index.ts
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
export {
  createStore
};
