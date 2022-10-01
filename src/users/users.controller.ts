import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddTagsDto } from './dto/add-tags.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.decorator';
import { UsersService } from './users.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  @ApiBearerAuth()
  getUser(@User() user): Promise<any> {
    return this.usersService.getUser(user);
  }

  @Get('tag/my')
  @ApiBearerAuth()
  getMyTags(@User() user): Promise<any> {
    return this.usersService.getMyTags(user);
  }

  @Post('tag')
  @ApiBearerAuth()
  @ApiConsumes('application/x-www-form-urlencoded')
  addTags(@Body() addTagsDto: AddTagsDto, @User() user): Promise<any> {
    return this.usersService.addTags(addTagsDto, user);
  }

  @Put()
  @ApiBearerAuth()
  @ApiConsumes('application/x-www-form-urlencoded')
  editUser(@Body() updateUserDto: UpdateUserDto, @User() user): Promise<any> {
    return this.usersService.editUser(updateUserDto, user);
  }

  @Delete('tag/:id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  deleteTag(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.usersService.deleteTag(user, id);
  }

  @Delete()
  @ApiBearerAuth()
  async deleteUser(@User() user): Promise<void> {
    await this.authService.logout();
    return this.usersService.deleteUser(user);
  }
}
