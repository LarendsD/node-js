export default {
  up: `
  CREATE TABLE users (
    uid UUID NOT NULL DEFAULT uuid_generate_v1() UNIQUE, 
    email varchar(100) UNIQUE,
    password varchar(100),
    nickname varchar(30) UNIQUE
  );`,
  down: `DROP TABLE users CASCADE`,
};
