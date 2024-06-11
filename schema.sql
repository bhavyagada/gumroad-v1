DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS permalink;

CREATE TABLE IF NOT EXISTS user (
  email TEXT NOT NULL,
  payment_address TEXT,
  name TEXT,
  password TEXT NOT NULL,
  salt TEXT NOT NULL UNIQUE,
  auth_token TEXT UNIQUE,
  reset_hash TEXT,
  create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  balance DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS permalink (
  permalink TEXT NOT NULL
);
