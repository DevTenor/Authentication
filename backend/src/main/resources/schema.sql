CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    encoded_password VARCHAR(128),
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    mobile_phone VARCHAR(20),
    created_at timestamptz default current_timestamp
);