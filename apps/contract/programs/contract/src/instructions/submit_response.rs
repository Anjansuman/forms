use anchor_lang::prelude::*;

use crate::state::FormResponse;

pub fn submit_response(
    ctx: Context<SubmitResponse>,
    form: Pubkey,
    answers: Vec<u8>
) -> Result<()> {
    
    let response = &mut ctx.accounts.response_account;

    response.form = form;
    response.responder = ctx.accounts.responder.key();
    response.responded_at = Clock::get()?.unix_timestamp;
    response.answers = answers;
    
    Ok(())
}

#[derive(Accounts)]
#[instruction(form_id: u64)]
pub struct SubmitResponse<'info> {
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
    pub system_program: Program<'info, System>
}