import { Pool } from 'pg';

export default new Pool({
  user: process.env.DATABASE_USERNAME || 'postgres',
  ssl: { rejectUnauthorized: false },
  connectionString: process.env.DATABASE_URL,
  password: process.env.DATABASE_PASSWORD || 'postgres',
  port: Number(process.env.DATABASE_PORT),
});
