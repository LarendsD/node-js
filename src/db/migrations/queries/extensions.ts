export default {
  up: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
  down: `DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE`,
};
