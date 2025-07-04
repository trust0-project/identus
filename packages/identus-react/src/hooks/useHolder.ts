import SDK from "@hyperledger/identus-sdk";
import { useContext } from "react";
import { HolderContext } from "../context";

/**
 * Hook for accessing credential holder context and operations.
 * 
 * Provides functionality for receiving, storing, and presenting verifiable credentials.
 * This hook must be used within a HolderProvider and requires a running agent.
 * 
 * @returns {Object} Holder context
 * 
 * @throws {Error} When used outside of HolderProvider
 * 
 */
export function useHolder() {
    const context = useContext(HolderContext);
    if (!context) {
        throw new Error('useHolder must be used within a HolderProvider');
    }
    return context;
}