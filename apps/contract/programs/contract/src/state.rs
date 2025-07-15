use anchor_lang::prelude::*;


#[account]
pub struct FormMetaData {
    pub creator: Pubkey,
    pub created_at: i64,
    pub title: String,
    pub description: String,
    pub form_schema: Vec<FormField>,
    pub bump: u8
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct FormField {
    pub query: String,
    pub field_type: u8,
    pub required: bool
}

#[account]
pub struct FormResponse {
    pub form: Pubkey,
    pub responder: Pubkey,
    pub answers: Vec<u8>,
    pub responded_at: i64,
    pub bump: u8
}

impl FormMetaData {
    pub const MAX_SIZE: usize =
        32 +
        8 +
        4 + 150 +
        4 + 300 +
        4 + (FormField::MAX_SIZE * 10) +
        1;
}

impl FormField {
    pub const MAX_SIZE: usize =
        4 + 150 +
        1 +
        2;
}

impl FormResponse {
    pub const MAX_SIZE: usize =
        32 +
        32 +
        300 +
        8 +
        1;
}