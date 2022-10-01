import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: process.env.DATABASE_USERNAME,
    //host: process.env.DATABASE_HOST,
    //database: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionString: process.env.DATABASE_URL,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
