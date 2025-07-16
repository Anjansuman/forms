"use client"

import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import idl from "../anchor/forms_contract.json";


export function useProgram() {
    const wallet = useAnchorWallet();
    const { connection } = useConnection();

    if(!wallet) return null;
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });

    return new Program(idl as Idl, provider);
}