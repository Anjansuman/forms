import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import type { Idl } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";

import idl from "../anchor/forms_contract.json";
import { FormsContract } from "../anchor/forms_contract";
import { FormField } from "../types/FormField";

export class FormsClient {

    private program: Program<FormsContract> | null = null;
    private provider: AnchorProvider | null = null;
    private wallet: WalletContextState | null = null;


    constructor(connection: Connection, wallet: WalletContextState) {

        if (!wallet.publicKey || !wallet.signTransaction) {
            throw new Error("Wallet not connected or incomplete!");
        }

        this.init(connection, wallet);
    }

    private init(connection: Connection, wallet: WalletContextState) {
        try {
            this.wallet = wallet;

            this.provider = new AnchorProvider(
                connection,
                wallet as any,
                {
                    commitment: "confirmed"
                }
            );
            this.program = new Program<FormsContract>(idl as Idl, this.provider);
        } catch (error) {
            this.handleError(error);
        }
    }

    public async createForm(formId: number, title: string, description: string, schema: FormField[]): Promise<string | null> {
        try {

            if (!this.program) {
                this.handleError("Program not found!");
                return null;
            }

            const [formPDA, bump] = this.getFormPda(formId, this.getWalletPublicKey());

            const res = await this.program.methods
                .createForm(new BN(formId), title, description, schema)
                .accountsStrict({
                    formMetadata: formPDA,
                    creator: this.getWalletPublicKey(),
                    systemProgram: SystemProgram.programId
                })
                .signers([])
                .rpc();

            // return the transaction
            return res;

            /*
            
            there is this, [this can be used to auto create pda or other accounts]
            .accounts({
                creator: this.getWalletPublickey()
            })
            
            */

        } catch (error) {
            this.handleError(error);
            return null;
        }
    }

    public async submitResponse(formId: number,formCreator: PublicKey, answers: Uint8Array): Promise<string | null> {
        try {

            if (!this.program) {
                this.handleError("Program not found!");
                return null;
            }

            const [responsePDA, bump] = this.getResponsePda(formId, this.getWalletPublicKey());
            const [formPDA, _] = this.getFormPda(formId, formCreator);

            const res = await this.program.methods
            .submitResponse(new BN(formId), Buffer.from(answers))
            .accountsStrict({
                formMetadata: formPDA,
                responseAccount: responsePDA,
                responder: this.getWalletPublicKey(),
                systemProgram: SystemProgram.programId
            })
            .signers([])
            .rpc()

            return res;

        } catch (error) {
            this.handleError(error);
            return null;
        }
    }

    public async close_form(formId: number, formCreator: PublicKey): Promise<string | null> {
        try {

            if(!this.program) {
                this.handleError("Program not found!");
                return null;
            }

            const [formPDA, bump] = this.getFormPda(formId, formCreator);

            const res = await this.program.methods
            .closeForm(new BN(formId))
            .accountsStrict({
                formMetadata: formPDA,
                creator: formCreator
            })
            .signers([])
            .rpc();

            return res;
            
        } catch (error) {
            this.handleError(error);
            return null;
        }
    }

    public async delete_response(formId: number, formCreator: PublicKey): Promise<string | null> {
        try {

            if(!this.program) {
                this.handleError("Program not found!");
                return null;
            }

            const [responsePDA, bump] = this.getResponsePda(formId, this.getWalletPublicKey());

            const res = await this.program.methods
            .deleteResponse(new BN(formId))
            .accountsStrict({
                responseAccount: responsePDA,
                responder: this.getWalletPublicKey()
            })
            .signers([])
            .rpc();

            return res;
            
        } catch (error) {
            this.handleError(error);
            return null;
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

    private handleError(error: unknown): void {
        if (typeof error == undefined) {
            throw new Error("undefined error!");
        }

        if (typeof error === "string") {
            throw new Error(error);
        }

        throw new Error("unknown error!");

    }

}