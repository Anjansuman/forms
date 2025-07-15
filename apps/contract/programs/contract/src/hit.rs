use anchor_lang::prelude::*;

declare_id!("");

#[program]
pub mod contract {

}

#[derive(Accounts)]
pub struct CreateForm<'info> {
    #[account(
        init,
        seeds = [b"form_metadata", creator.key().as_ref(), &form_id.to_le_bytes()],
        bump
        payer = creator,
        space = 8 + FormMetaData::MAX_SIZE
    )]
    pub form_metadata: Account<'info, FormMetaData>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
#[instruction(form_id)]
pub struct FormMetaData {
    pub creator: Pubkey,
    pub created_at: i64,
    pub title: String,
    pub description: String,
    pub field_schema: Vec<u8>,
    pub bump: u8
}

#[account]
pub struct FormSchema {
    pub query: String,
    pub field_type: u8,
    pub required: bool
}

#[account]
pub struct FormResponse {
    pub form: Pubkey,
    pub responder: Pubkey,
    pub answers: Vec<u8>,
    pub submitted_at: i64,
    pub bum: u8
}

impl FormMetaData {
    pub const MAX_SIZE: usize = 
        32 +
        8 +
        4 + 150 +
        4 + 300 +
        4 + (FormSchema::MAX_SIZE * 10) +
        1;
}

impl FormSchema {
    pub const MAX_SIZE: usize =
        4 + 150 +
        1 +
        2;
}