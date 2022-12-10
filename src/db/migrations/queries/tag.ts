export default {
  up: `
  CREATE TABLE tag (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    creator uuid REFERENCES users(uid) ON DELETE CASCADE,
    name varchar(40) UNIQUE,
    sortOrder integer DEFAULT 0
  );`,
  down: `DROP TABLE tag CASCADE`,
};
