import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './users/user.decorator';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('api')
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService,
  ) {}

  @Post('signin')
  @ApiConsumes('application/x-www-form-urlencoded')
  async signIn(@Body() createUserDto: CreateUserDto) {
    return this.appService.signIn(createUserDto);
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('reset')
  async reset(@User() user) {
    return this.authService.reset(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
