import * as _trust0_ridb_core from '@trust0/ridb-core';

declare const schemas: {
    credentials: Omit<{
        encrypted: ("recoveryId" | "revoked" | "dataJson" | "issuer" | "subject" | "credentialCreated" | "credentialUpdated" | "credentialSchema" | "validUntil" | "id")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            recoveryId: {
                type: "string";
                required: true;
            };
            revoked: {
                type: "boolean";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            issuer: {
                type: "string";
            };
            subject: {
                type: "string";
            };
            credentialCreated: {
                type: "string";
            };
            credentialUpdated: {
                type: "string";
            };
            credentialSchema: {
                type: "string";
            };
            validUntil: {
                type: "number";
            };
            id: {
                type: "string";
                required: true;
            };
        };
    }, "properties"> & {
        version: 0;
        encrypted: never[] | ("recoveryId" | "revoked" | "dataJson" | "issuer" | "subject" | "credentialCreated" | "credentialUpdated" | "credentialSchema" | "validUntil" | "id")[];
        properties: {
            recoveryId: {
                type: "string";
                required: true;
            };
            revoked: {
                type: "boolean";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            issuer: {
                type: "string";
            };
            subject: {
                type: "string";
            };
            credentialCreated: {
                type: "string";
            };
            credentialUpdated: {
                type: "string";
            };
            credentialSchema: {
                type: "string";
            };
            validUntil: {
                type: "number";
            };
            id: {
                type: "string";
                required: true;
            };
        } & {
            status: {
                type: "string";
            };
        };
    };
    dids: Omit<{
        encrypted: ("alias" | "method" | "schema")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            alias: {
                type: "string";
            };
            method: {
                type: "string";
                required: true;
            };
            schema: {
                type: "string";
                required: true;
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
        };
    }, "properties"> & {
        version: 0;
        encrypted: never[] | ("schema" | "alias" | "method")[];
        properties: {
            alias: {
                type: "string";
            };
            method: {
                type: "string";
                required: true;
            };
            schema: {
                type: "string";
                required: true;
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
        } & {
            status: {
                type: "string";
            };
        };
    };
    messages: Omit<{
        encrypted: ("to" | "dataJson" | "id" | "createdTime" | "thid" | "piuri" | "from" | "isReceived")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            to: {
                type: "string";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            id: {
                type: "string";
                required: true;
            };
            createdTime: {
                type: "number";
                required: true;
            };
            thid: {
                type: "string";
            };
            piuri: {
                type: "string";
                required: true;
            };
            from: {
                type: "string";
            };
            isReceived: {
                type: "number";
                required: true;
            };
        };
    }, "properties"> & {
        version: 0;
        encrypted: never[] | ("dataJson" | "id" | "to" | "createdTime" | "thid" | "piuri" | "from" | "isReceived")[];
        properties: {
            to: {
                type: "string";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            id: {
                type: "string";
                required: true;
            };
            createdTime: {
                type: "number";
                required: true;
            };
            thid: {
                type: "string";
            };
            piuri: {
                type: "string";
                required: true;
            };
            from: {
                type: "string";
            };
            isReceived: {
                type: "number";
                required: true;
            };
        } & {
            read: {
                type: "boolean";
                default: false;
                required: true;
            };
        };
    };
    "credential-metadata": Omit<{
        encrypted: ("recoveryId" | "dataJson" | "name")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            recoveryId: {
                type: "string";
                required: true;
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            name: {
                type: "string";
                required: true;
            };
        };
    }, "version"> & {
        version: 0;
    };
    "didkey-link": Omit<{
        encrypted: ("alias" | "didId" | "keyId")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            alias: {
                type: "string";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            didId: {
                type: "string";
                required: true;
            };
            keyId: {
                type: "string";
                required: true;
            };
        };
    }, "version"> & {
        version: 0;
    };
    "did-link": Omit<{
        encrypted: ("alias" | "role" | "hostId" | "targetId")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            alias: {
                type: "string";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            role: {
                type: "number";
                required: true;
            };
            hostId: {
                type: "string";
                required: true;
            };
            targetId: {
                type: "string";
                required: true;
            };
        };
    }, "version"> & {
        version: 0;
    };
    keys: Omit<{
        encrypted: ("alias" | "index" | "recoveryId" | "rawHex")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            alias: {
                type: "string";
            };
            index: {
                type: "number";
            };
            recoveryId: {
                type: "string";
                required: true;
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            rawHex: {
                type: "string";
                required: true;
            };
        };
    }, "version"> & {
        version: 0;
    };
};
declare const issuerSchemas: {
    issuance: {
        version: 0;
        primaryKey: string;
        type: "object";
        encrypted: string[];
        properties: {
            id: {
                type: "string";
                required: true;
            };
            claims: {
                type: "array";
                items: {
                    type: "object";
                    properties: {
                        name: {
                            type: "string";
                            required: true;
                        };
                        value: {
                            type: "string";
                            required: true;
                        };
                        type: {
                            type: "string";
                            required: true;
                        };
                    };
                };
            };
            credentialFormat: {
                type: "string";
                required: true;
            };
            automaticIssuance: {
                type: "boolean";
            };
            issuingDID: {
                type: "string";
                required: true;
            };
            status: {
                type: "string";
                required: true;
            };
        };
    };
    credentials: Omit<{
        encrypted: ("recoveryId" | "revoked" | "dataJson" | "issuer" | "subject" | "credentialCreated" | "credentialUpdated" | "credentialSchema" | "validUntil" | "id")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            recoveryId: {
                type: "string";
                required: true;
            };
            revoked: {
                type: "boolean";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            issuer: {
                type: "string";
            };
            subject: {
                type: "string";
            };
            credentialCreated: {
                type: "string";
            };
            credentialUpdated: {
                type: "string";
            };
            credentialSchema: {
                type: "string";
            };
            validUntil: {
                type: "number";
            };
            id: {
                type: "string";
                required: true;
            };
        };
    }, "properties"> & {
        version: 0;
        encrypted: never[] | ("recoveryId" | "revoked" | "dataJson" | "issuer" | "subject" | "credentialCreated" | "credentialUpdated" | "credentialSchema" | "validUntil" | "id")[];
        properties: {
            recoveryId: {
                type: "string";
                required: true;
            };
            revoked: {
                type: "boolean";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            issuer: {
                type: "string";
            };
            subject: {
                type: "string";
            };
            credentialCreated: {
                type: "string";
            };
            credentialUpdated: {
                type: "string";
            };
            credentialSchema: {
                type: "string";
            };
            validUntil: {
                type: "number";
            };
            id: {
                type: "string";
                required: true;
            };
        } & {
            status: {
                type: "string";
            };
        };
    };
    dids: Omit<{
        encrypted: ("alias" | "method" | "schema")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            alias: {
                type: "string";
            };
            method: {
                type: "string";
                required: true;
            };
            schema: {
                type: "string";
                required: true;
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
        };
    }, "properties"> & {
        version: 0;
        encrypted: never[] | ("schema" | "alias" | "method")[];
        properties: {
            alias: {
                type: "string";
            };
            method: {
                type: "string";
                required: true;
            };
            schema: {
                type: "string";
                required: true;
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
        } & {
            status: {
                type: "string";
            };
        };
    };
    messages: Omit<{
        encrypted: ("to" | "dataJson" | "id" | "createdTime" | "thid" | "piuri" | "from" | "isReceived")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            to: {
                type: "string";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            id: {
                type: "string";
                required: true;
            };
            createdTime: {
                type: "number";
                required: true;
            };
            thid: {
                type: "string";
            };
            piuri: {
                type: "string";
                required: true;
            };
            from: {
                type: "string";
            };
            isReceived: {
                type: "number";
                required: true;
            };
        };
    }, "properties"> & {
        version: 0;
        encrypted: never[] | ("dataJson" | "id" | "to" | "createdTime" | "thid" | "piuri" | "from" | "isReceived")[];
        properties: {
            to: {
                type: "string";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            id: {
                type: "string";
                required: true;
            };
            createdTime: {
                type: "number";
                required: true;
            };
            thid: {
                type: "string";
            };
            piuri: {
                type: "string";
                required: true;
            };
            from: {
                type: "string";
            };
            isReceived: {
                type: "number";
                required: true;
            };
        } & {
            read: {
                type: "boolean";
                default: false;
                required: true;
            };
        };
    };
    "credential-metadata": Omit<{
        encrypted: ("recoveryId" | "dataJson" | "name")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            recoveryId: {
                type: "string";
                required: true;
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            dataJson: {
                type: "string";
                required: true;
            };
            name: {
                type: "string";
                required: true;
            };
        };
    }, "version"> & {
        version: 0;
    };
    "didkey-link": Omit<{
        encrypted: ("alias" | "didId" | "keyId")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            alias: {
                type: "string";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            didId: {
                type: "string";
                required: true;
            };
            keyId: {
                type: "string";
                required: true;
            };
        };
    }, "version"> & {
        version: 0;
    };
    "did-link": Omit<{
        encrypted: ("alias" | "role" | "hostId" | "targetId")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            alias: {
                type: "string";
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            role: {
                type: "number";
                required: true;
            };
            hostId: {
                type: "string";
                required: true;
            };
            targetId: {
                type: "string";
                required: true;
            };
        };
    }, "version"> & {
        version: 0;
    };
    keys: Omit<{
        encrypted: ("alias" | "index" | "recoveryId" | "rawHex")[];
        version: number;
        primaryKey: string;
        type: string;
        indexes?: string[];
        properties: {
            alias: {
                type: "string";
            };
            index: {
                type: "number";
            };
            recoveryId: {
                type: "string";
                required: true;
            };
            uuid: {
                type: "string";
                maxLength: 60;
                required: true;
            };
            rawHex: {
                type: "string";
                required: true;
            };
        };
    }, "version"> & {
        version: 0;
    };
};
declare const migrations: {
    credentials: {
        [x: number]: _trust0_ridb_core.MigrationFunction<{
            encrypted: ("recoveryId" | "revoked" | "dataJson" | "issuer" | "subject" | "credentialCreated" | "credentialUpdated" | "credentialSchema" | "validUntil" | "id")[];
            version: number;
            primaryKey: string;
            type: string;
            indexes?: string[];
            properties: {
                recoveryId: {
                    type: "string";
                    required: true;
                };
                revoked: {
                    type: "boolean";
                };
                uuid: {
                    type: "string";
                    maxLength: 60;
                    required: true;
                };
                dataJson: {
                    type: "string";
                    required: true;
                };
                issuer: {
                    type: "string";
                };
                subject: {
                    type: "string";
                };
                credentialCreated: {
                    type: "string";
                };
                credentialUpdated: {
                    type: "string";
                };
                credentialSchema: {
                    type: "string";
                };
                validUntil: {
                    type: "number";
                };
                id: {
                    type: "string";
                    required: true;
                };
            };
        }>;
    };
    "credential-metadata": {
        [x: number]: _trust0_ridb_core.MigrationFunction<{
            encrypted: ("recoveryId" | "dataJson" | "name")[];
            version: number;
            primaryKey: string;
            type: string;
            indexes?: string[];
            properties: {
                recoveryId: {
                    type: "string";
                    required: true;
                };
                uuid: {
                    type: "string";
                    maxLength: 60;
                    required: true;
                };
                dataJson: {
                    type: "string";
                    required: true;
                };
                name: {
                    type: "string";
                    required: true;
                };
            };
        }>;
    };
    "didkey-link": {
        [x: number]: _trust0_ridb_core.MigrationFunction<{
            encrypted: ("alias" | "didId" | "keyId")[];
            version: number;
            primaryKey: string;
            type: string;
            indexes?: string[];
            properties: {
                alias: {
                    type: "string";
                };
                uuid: {
                    type: "string";
                    maxLength: 60;
                    required: true;
                };
                didId: {
                    type: "string";
                    required: true;
                };
                keyId: {
                    type: "string";
                    required: true;
                };
            };
        }>;
    };
    "did-link": {
        [x: number]: _trust0_ridb_core.MigrationFunction<{
            encrypted: ("alias" | "role" | "hostId" | "targetId")[];
            version: number;
            primaryKey: string;
            type: string;
            indexes?: string[];
            properties: {
                alias: {
                    type: "string";
                };
                uuid: {
                    type: "string";
                    maxLength: 60;
                    required: true;
                };
                role: {
                    type: "number";
                    required: true;
                };
                hostId: {
                    type: "string";
                    required: true;
                };
                targetId: {
                    type: "string";
                    required: true;
                };
            };
        }>;
    };
    dids: {
        [x: number]: _trust0_ridb_core.MigrationFunction<{
            encrypted: ("alias" | "method" | "schema")[];
            version: number;
            primaryKey: string;
            type: string;
            indexes?: string[];
            properties: {
                alias: {
                    type: "string";
                };
                method: {
                    type: "string";
                    required: true;
                };
                schema: {
                    type: "string";
                    required: true;
                };
                uuid: {
                    type: "string";
                    maxLength: 60;
                    required: true;
                };
            };
        }>;
    };
    keys: {
        [x: number]: _trust0_ridb_core.MigrationFunction<{
            encrypted: ("alias" | "index" | "recoveryId" | "rawHex")[];
            version: number;
            primaryKey: string;
            type: string;
            indexes?: string[];
            properties: {
                alias: {
                    type: "string";
                };
                index: {
                    type: "number";
                };
                recoveryId: {
                    type: "string";
                    required: true;
                };
                uuid: {
                    type: "string";
                    maxLength: 60;
                    required: true;
                };
                rawHex: {
                    type: "string";
                    required: true;
                };
            };
        }>;
    };
    messages: {
        [x: number]: _trust0_ridb_core.MigrationFunction<{
            encrypted: ("to" | "dataJson" | "id" | "createdTime" | "thid" | "piuri" | "from" | "isReceived")[];
            version: number;
            primaryKey: string;
            type: string;
            indexes?: string[];
            properties: {
                to: {
                    type: "string";
                };
                uuid: {
                    type: "string";
                    maxLength: 60;
                    required: true;
                };
                dataJson: {
                    type: "string";
                    required: true;
                };
                id: {
                    type: "string";
                    required: true;
                };
                createdTime: {
                    type: "number";
                    required: true;
                };
                thid: {
                    type: "string";
                };
                piuri: {
                    type: "string";
                    required: true;
                };
                from: {
                    type: "string";
                };
                isReceived: {
                    type: "number";
                    required: true;
                };
            };
        }>;
    };
};

export { issuerSchemas, migrations, schemas };
