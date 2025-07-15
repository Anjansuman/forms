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
        title: String,
        description: String,
        form_schema: Vec<FormField>
    ) -> Result<()> {
        instructions::create_form::create_form(ctx, title, description, form_schema)
    }

    pub fn submit_response(
        ctx: Context<SubmitResponse>,
        answers: Vec<u8>
    ) -> Result<()> {
        instructions::submit_response::submit_response(ctx, answers)
    }

    pub fn close_form(ctx: Context<CloseForm>) -> Result<()> {
        instructions::close_form::close_form(ctx)
    }

    pub fn delete_response(ctx: Context<DeleteResponse>) -> Result<()> {
        instructions::delete_response::delete_response(ctx)
    }

}