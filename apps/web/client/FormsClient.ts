import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import type { Idl } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";

import idl from "../anchor/forms_contract.json";
import { FormsContract } from "../anchor/forms_contract";
import { FormField } from "../types/FormField";

export class FormsClient {

    private program: Program <FormsContract>| null = null;
    private provider: AnchorProvider | null = null;
    private wallet: WalletContextState | null = null;


    constructor(connection: Connection, wallet: WalletContextState) {

        if (!wallet.publicKey || !wallet.signTransaction) {
            throw new Error("Wallet not connected or incomplete!");
        }

        this.init(connection, wallet);
    }

    private init(connection: Connection, wallet: WalletContextState) {
        this.wallet = wallet;

        this.provider = new AnchorProvider(
            connection,
            wallet as any,
            {
                commitment: "confirmed"
            }
        );
        this.program = new Program<FormsContract>(idl as FormsContract, this.provider);
    }

    public async createForm(formId: number, title: string, description: string, schema: FormField[]): Promise<void> {
        try {

            if(!this.program) {
                throw new Error("Program not found!");
            }

            const [formPDA, bump] = this.getFormPda(formId, this.getWalletPublicKey());

            const res = await this.program.methods
            .createForm(new BN(formId), title, description, schema)
            .accounts({
                formMetadata: formPDA,
                creator: this.getWalletPublicKey(),
                systemProgram: SystemProgram.programId
            })
            .signers([])
            .rpc()

        } catch (error) {

        }
    }

    getFormPda(formId: number, creator: PublicKey): [PublicKey, number] {

        if (!this.program) {
            throw new Error("Program not found!");
        }

        const [formPDA, bump] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("form_metadata"),
                creator.toBuffer(),
                new BN(formId).toArrayLike(Buffer, "le", 8)
            ],
            this.program.programId
        )

        return [formPDA, bump];
    }

    getResponsePda(formId: number, responder: PublicKey): [PublicKey, number] {
        if (!this.program) {
            throw new Error("Program not found!");
        }

        const [responsePDA, bump] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("form_response"),
                responder.toBuffer(),
                new BN(formId).toArrayLike(Buffer, "le", 8)
            ],
            this.program.programId
        )

        return [responsePDA, bump];
    }

    public getWalletPublicKey(): PublicKey {

        if (!this.wallet) {
            throw new Error("");
        }

        return this.wallet.publicKey!;
    }

}