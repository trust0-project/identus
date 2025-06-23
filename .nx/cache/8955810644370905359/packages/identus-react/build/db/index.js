"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/db/index.ts
var db_exports = {};
__export(db_exports, {
  issuerSchemas: () => issuerSchemas,
  migrations: () => migrations,
  schemas: () => schemas
});
module.exports = __toCommonJS(db_exports);
var import_ridb_core = require("@trust0/ridb-core");
var import_identus_sdk = __toESM(require("@hyperledger/identus-sdk"));
var collections = import_identus_sdk.default.makeCollections();
function migrateSchema({ properties: schemaProperties, ...schemaWithoutProperties }, additionalProperties) {
  const schema = {
    ...schemaWithoutProperties,
    version: 0,
    encrypted: schemaWithoutProperties.encrypted || [],
    properties: Object.fromEntries(
      Object.entries({
        ...schemaProperties,
        ...additionalProperties
      }).map(([key, value]) => {
        const propValue = { ...value };
        propValue.required = propValue?.required === true;
        propValue.maxLength = void 0;
        return [key, propValue];
      })
    )
  };
  return schema;
}
function extractSchemas(collections2) {
  const result = {};
  for (const key in collections2) {
    if (Object.prototype.hasOwnProperty.call(collections2, key)) {
      result[key] = migrateSchema(collections2[key].schema, {});
    }
  }
  return result;
}
function extractMigrations(collections2) {
  const result = {};
  for (const key in collections2) {
    if (Object.prototype.hasOwnProperty.call(collections2, key)) {
      result[key] = migrateSchema(collections2[key].schema, {});
    }
  }
  return result;
}
var schemas = {
  ...extractSchemas(collections),
  credentials: migrateSchema(collections.credentials.schema, {
    status: {
      type: import_ridb_core.SchemaFieldType.string
    }
  }),
  dids: migrateSchema(collections.dids.schema, {
    status: {
      type: import_ridb_core.SchemaFieldType.string
    }
  }),
  messages: migrateSchema(collections.messages.schema, {
    read: {
      type: import_ridb_core.SchemaFieldType.boolean,
      default: false,
      required: true
    }
  })
};
var issuerSchemas = {
  ...schemas,
  issuance: {
    version: 0,
    primaryKey: "id",
    type: import_ridb_core.SchemaFieldType.object,
    encrypted: ["claims"],
    properties: {
      id: {
        type: import_ridb_core.SchemaFieldType.string,
        required: true
      },
      claims: {
        type: import_ridb_core.SchemaFieldType.array,
        items: {
          type: import_ridb_core.SchemaFieldType.object,
          properties: {
            name: {
              type: import_ridb_core.SchemaFieldType.string,
              required: true
            },
            value: {
              type: import_ridb_core.SchemaFieldType.string,
              required: true
            },
            type: {
              type: import_ridb_core.SchemaFieldType.string,
              required: true
            }
          }
        }
      },
      credentialFormat: {
        type: import_ridb_core.SchemaFieldType.string,
        required: true
      },
      automaticIssuance: {
        type: import_ridb_core.SchemaFieldType.boolean
      },
      issuingDID: {
        type: import_ridb_core.SchemaFieldType.string,
        required: true
      },
      status: {
        type: import_ridb_core.SchemaFieldType.string,
        required: true
      }
    }
  }
};
var migrations = extractMigrations(collections);
