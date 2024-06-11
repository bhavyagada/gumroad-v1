DROP TABLE IF EXISTS link;
DROP TABLE IF EXISTS file;
DROP TABLE IF EXISTS purchase;
DROP TABLE IF EXISTS permalink;
DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS link (
  owner TEXT NOT NULL,
  name TEXT NOT NULL,
  unique_permalink TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  preview_url TEXT,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
  create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  length_of_exclusivity INTEGER DEFAULT 0,
  number_of_paid_downloads INTEGER DEFAULT 0,
  number_of_downloads INTEGER DEFAULT 0,
  download_limit INTEGER DEFAULT 0,
  number_of_views INTEGER DEFAULT 0,
  balance DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS file (
  unique_permalink TEXT NOT NULL UNIQUE,
  blob_key TEXT,
  file_name TEXT,
  file_type TEXT,
  date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS purchase (
  owner TEXT NOT NULL,
  unique_permalink TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  create_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permalink (
  permalink TEXT NOT NULL
);

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