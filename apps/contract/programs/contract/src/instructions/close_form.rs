use anchor_lang::prelude::*;

use crate::state::FormMetaData;
use crate::form_error::FormError;

pub fn close_form(ctx: Context<CloseForm>, form_id: u64) -> Result<()> {

    let form = &mut ctx.accounts.form_metadata;

    require!(form.is_open, FormError::FormClosed);
    require!(form.creator == ctx.accounts.creator.key(), FormError::Unauthorized);

    let _ = form_id;

    form.is_open = false;

    Ok(())
}

#[derive(Accounts)]
#[instruction(form_id: u64)]
pub struct CloseForm<'info> {
    #[account(
        mut,
        seeds = [b"form_metadata", form_metadata.creator.as_ref(), &form_id.to_le_bytes()],
        bump = form_metadata.bump
    )]
    pub form_metadata: Account<'info, FormMetaData>,

    #[account(mut)]
    pub creator: Signer<'info>
}
