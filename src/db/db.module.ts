import { Module } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { config } from 'dotenv';
import * as useValue from './db.config';

config();
const dbProvider = {
  provide: PG_CONNECTION,
  useValue,
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
