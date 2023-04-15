import { NotAcceptableException, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PG_CONNECTION } from './constants';
import { CreateUserDto } from './users/dto/create-user.dto';
import { AuthService } from './auth/auth.service';
import { encrypt } from './users/secure/secure';
import { Cache } from 'cache-manager';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(PG_CONNECTION) private connection: any,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  async signIn({ email, password, nickname }: CreateUserDto) {
    const [user] = await this.usersService.searchUser(email, nickname);
    if (user) {
      return new NotAcceptableException('Email or nickname is already exist!');
    }
    const encryptedPassword = encrypt(password);
    const { rows } = await this.connection.query(
      `INSERT INTO users (email, password, nickname) VALUES ('${email}', '${encryptedPassword}', '${nickname}') RETURNING uid, nickname, email`,
    );
    return this.authService.login(rows[0]);
  }
}
