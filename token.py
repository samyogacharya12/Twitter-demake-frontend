CREATE TABLE PasswordResetTokens (
    token_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    reset_token VARCHAR(64) UNIQUE,
    expiration TIMESTAMP,
    used BOOLEAN DEFAULT FALSE
);
