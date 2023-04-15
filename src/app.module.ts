import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TagModule } from './tag/tag.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    TagModule,
    DbModule,
    AuthModule,
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
