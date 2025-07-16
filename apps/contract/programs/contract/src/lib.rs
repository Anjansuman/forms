pub mod state;
pub mod instructions;
pub mod form_error;

use anchor_lang::prelude::*;
use instructions::*;
use state::*;

declare_id!("7LH4wHecq4RTHec87zdEaTWRZVceM9RRzoZKPA4nBTs6");

#[program]
pub mod forms_contract {
    use super::*;

    pub fn create_form(
        ctx: Context<CreateForm>,
        form_id: u64,
        title: String,
        description: String,
        form_schema: Vec<FormField>
    ) -> Result<()> {
        instructions::create_form::create_form(ctx, form_id, title, description, form_schema)
    }

    pub fn submit_response(
        ctx: Context<SubmitResponse>,
        form_id: u64,
        answers: Vec<u8>
    ) -> Result<()> {
        instructions::submit_response::submit_response(ctx, form_id, answers)
    }

    pub fn close_form(ctx: Context<CloseForm>, form_id: u64) -> Result<()> {
        instructions::close_form::close_form(ctx, form_id)
    }

    pub fn delete_response(ctx: Context<DeleteResponse>, form_id: u64) -> Result<()> {
        instructions::delete_response::delete_response(ctx, form_id)
    }

}