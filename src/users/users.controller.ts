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
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddTagsDto } from './dto/add-tags.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.decorator';
import { UsersService } from './users.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  getUser(@User() user): Promise<any> {
    return this.usersService.getUser(user);
  }

  @Get('tag/my')
  getMyTags(@User() user): Promise<any> {
    return this.usersService.getMyTags(user);
  }

  @Post('tag')
  addTags(@Body() addTagsDto: AddTagsDto, @User() user): Promise<any> {
    return this.usersService.addTags(addTagsDto, user);
  }

  @Put()
  editUser(@Body() updateUserDto: UpdateUserDto, @User() user): Promise<any> {
    return this.usersService.editUser(updateUserDto, user);
  }

  @Delete('tag/:id')
  deleteTag(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.usersService.deleteTag(user, id);
  }

  @Delete()
  async deleteUser(@User() user): Promise<void> {
    await this.authService.logout();
    return this.usersService.deleteUser(user);
  }
}
