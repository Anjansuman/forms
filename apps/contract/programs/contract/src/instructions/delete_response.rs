use anchor_lang::prelude::*;

use crate::state::FormResponse;
use crate::form_error::FormError;

pub fn delete_response(ctx: Context<DeleteResponse>, form_id: u64) -> Result<()> {

    let response = &ctx.accounts.response_account;

    require!(response.responder == ctx.accounts.responder.key(), FormError::Unauthorized);

    let _ = form_id;

    Ok(())
}

#[derive(Accounts)]
#[instruction(form_id: u64)]
pub struct DeleteResponse <'info>{
    #[account(
        mut,
        seeds = [b"form_response", responder.key().as_ref(), &form_id.to_le_bytes()],
        bump = response_account.bump,
        close = responder
    )]
    pub response_account: Account<'info, FormResponse>,
    #[account(mut)]
    pub responder: Signer<'info>
}