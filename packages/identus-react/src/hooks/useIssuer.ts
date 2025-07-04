import SDK from "@hyperledger/identus-sdk";

import { useContext } from "react";
import { IssuerContext } from "../context";

/**
 * Hook for accessing credential issuance context and operations.
 * 
 * Provides functionality for creating and issuing verifiable credentials to holders.
 * This hook must be used within an IssuerProvider and requires a running agent.
 * 
 * @returns {Object} Issuer context
 * 
 * @throws {Error} When used outside of IssuerProvider
 * 
 */
export function useIssuer() {
    const context = useContext(IssuerContext);
    if (!context) {
        throw new Error('useIssuer must be used within a IssuerProvider');
    }
    return context;
}   