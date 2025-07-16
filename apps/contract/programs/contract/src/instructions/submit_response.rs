use anchor_lang::prelude::*;

use crate::form_error::FormError;
use crate::state::{FormMetaData, FormResponse};

pub fn submit_response(ctx: Context<SubmitResponse>, form_id: u64, answers: Vec<u8>) -> Result<()> {
    let form = &ctx.accounts.form_metadata;

    require!(form.is_open, FormError::FormClosed);

    let response = &mut ctx.accounts.response_account;

    let _ = form_id;

    response.form = form.key();
    response.responder = ctx.accounts.responder.key();
    response.responded_at = Clock::get()?.unix_timestamp;
    response.answers = answers;

    Ok(())
}

#[derive(Accounts)]
#[instruction(form_id: u64)]
pub struct SubmitResponse<'info> {
    #[account(
        seeds = [b"form_metadata", form_metadata.creator.as_ref(), &form_id.to_le_bytes()],
        bump = form_metadata.bump
    )]
    pub form_metadata: Account<'info, FormMetaData>,

    #[account(
        init,
        seeds = [b"form_response", responder.key().as_ref(), &form_id.to_le_bytes()],
        bump,
        payer = responder,
        space = 8 + FormResponse::MAX_SIZE
    )]
    pub response_account: Account<'info, FormResponse>,

    #[account(mut)]
    pub responder: Signer<'info>,
    pub system_program: Program<'info, System>,
}
