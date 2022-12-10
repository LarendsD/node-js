import { Module } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import * as useValue from './db.config';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue,
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
