pub mod state;
pub mod instructions;

use anchor_lang::prelude::*;
use instructions::*;
use state::*;

declare_id!("7LH4wHecq4RTHec87zdEaTWRZVceM9RRzoZKPA4nBTs6");

#[program]
pub mod forms_contract {
    use super::*;

    pub fn create_form(
        ctx: Context<CreateForm>,
        title: String,
        description: String,
        form_schema: Vec<FormField>
    ) -> Result<()> {
        instructions::create_form::create_form(ctx, title, description, form_schema)
    }

    pub fn submit_response(
        ctx: Context<SubmitResponse>,
        form: Pubkey,
        answers: Vec<u8>
    ) -> Result<()> {
        instructions::submit_response::submit_response(ctx, form, answers)
    }

}