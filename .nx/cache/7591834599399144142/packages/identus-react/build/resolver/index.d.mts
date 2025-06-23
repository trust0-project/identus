import SDK from '@hyperledger/identus-sdk';

type ResolverClass = new (apollo: SDK.Domain.Apollo) => SDK.Domain.DIDResolver;
declare function createResolver(baseUrl: string): {
    new (): {
        method: string;
        resolve(didString: string): Promise<SDK.Domain.DIDDocument>;
    };
};

export { type ResolverClass, createResolver };
