// src/db/index.ts
import { SchemaFieldType } from "@trust0/ridb-core";
import SDK from "@hyperledger/identus-sdk";
var collections = SDK.makeCollections();
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
      type: SchemaFieldType.string
    }
  }),
  dids: migrateSchema(collections.dids.schema, {
    status: {
      type: SchemaFieldType.string
    }
  }),
  messages: migrateSchema(collections.messages.schema, {
    read: {
      type: SchemaFieldType.boolean,
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
    type: SchemaFieldType.object,
    encrypted: ["claims"],
    properties: {
      id: {
        type: SchemaFieldType.string,
        required: true
      },
      claims: {
        type: SchemaFieldType.array,
        items: {
          type: SchemaFieldType.object,
          properties: {
            name: {
              type: SchemaFieldType.string,
              required: true
            },
            value: {
              type: SchemaFieldType.string,
              required: true
            },
            type: {
              type: SchemaFieldType.string,
              required: true
            }
          }
        }
      },
      credentialFormat: {
        type: SchemaFieldType.string,
        required: true
      },
      automaticIssuance: {
        type: SchemaFieldType.boolean
      },
      issuingDID: {
        type: SchemaFieldType.string,
        required: true
      },
      status: {
        type: SchemaFieldType.string,
        required: true
      }
    }
  }
};
var migrations = extractMigrations(collections);

export {
  schemas,
  issuerSchemas,
  migrations
};
