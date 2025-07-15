use anchor_lang::prelude::*;

use crate::state::{FormField, FormMetaData};

pub fn create_form(
    ctx: Context<CreateForm>,
    title: String,
    description: String,
    form_schema: Vec<FormField>,
) -> Result<()> {
    let form = &mut ctx.accounts.form_account;

    form.creator = ctx.accounts.creator.key();
    form.created_at = Clock::get()?.unix_timestamp;
    form.title = title;
    form.description = description;
    form.form_schema = form_schema;
    form.is_open = true;

    Ok(())
}

#[derive(Accounts)]
#[instruction(form_id: u64)]
pub struct CreateForm<'info> {
    #[account(
        init,
        seeds = [b"form_metadata", creator.key().as_ref(), &form_id.to_le_bytes()],
        bump,
        payer = creator,
        space = 8 + FormMetaData::MAX_SIZE
    )]
    pub form_account: Account<'info, FormMetaData>,

    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}
