export default {
  up: `
  CREATE TABLE user_tag (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_uid uuid REFERENCES users(uid) ON DELETE CASCADE,
    tags_id bigint REFERENCES tag(id) ON DELETE CASCADE
  );`,
  down: `DROP TABLE user_tag CASCADE`,
};
