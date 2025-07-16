import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "../anchor/forms_contract.json";
import program_id from "../anchor/forms_program_id.json";

const programID = new PublicKey(program_id);

const connection = new Connection("https://api.devnet.solana.com");