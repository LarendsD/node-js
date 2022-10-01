import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const [user] = await this.usersService.searchUser(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      userId: user.uid,
      email: user.email,
      nickname: user.nickname,
    };
    const token = this.jwtService.sign(payload);
    await this.cacheManager.set('jwt', token, { ttl: 1800 });
    return {
      token,
      expire: '1800',
    };
  }

  async reset(user: User) {
    const payload = {
      userId: user.uid,
      email: user.email,
      nickname: user.nickname,
    };
    const token = this.jwtService.sign(payload);
    await this.cacheManager.set('jwt', token, { ttl: 1800 });
    return {
      token,
      expire: '1800',
    };
  }

  async logout() {
    return this.cacheManager.del('jwt');
  }
}
