CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  uid UUID NOT NULL DEFAULT uuid_generate_v1() UNIQUE, 
  email varchar(100) UNIQUE,
  password varchar(100),
  nickname varchar(30) UNIQUE
);

CREATE TABLE tag (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creator uuid REFERENCES users(uid) ON DELETE CASCADE,
  name varchar(40) UNIQUE,
  sortOrder integer DEFAULT 0
);

CREATE TABLE user_tag (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_uid uuid REFERENCES users(uid) ON DELETE CASCADE,
  tags_id bigint REFERENCES tag(id) ON DELETE CASCADE
);