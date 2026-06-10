CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version BIGINT NOT NULL DEFAULT 0,
    email VARCHAR(255) UNIQUE,
    encoded_password VARCHAR(128),
    username VARCHAR(128),
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    mobile_phone VARCHAR(20),
    created_at timestamptz default current_timestamp
);