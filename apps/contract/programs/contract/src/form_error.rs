use anchor_lang::error_code;



#[error_code]
pub enum FormError {
    #[msg("Form is closed for responses")]
    FormClosed,

    #[msg("Unauthorized")]
    Unauthorized
}