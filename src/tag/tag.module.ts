import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
