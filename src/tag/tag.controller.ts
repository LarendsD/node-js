import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { SearchTagDto } from './dto/search-tag-dto';
import { TagService } from './tag.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/user.decorator';

@Controller('tag')
@UseGuards(JwtAuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  createTag(@User() user, @Body() createTagDto: CreateTagDto): Promise<any> {
    return this.tagService.createTag(createTagDto, user);
  }

  @Get(':id')
  getTag(@Param('id', ParseIntPipe) id: number, @User() user): Promise<any> {
    return this.tagService.getTag(id, user);
  }

  @Get()
  async getTags(
    @Query()
    params: SearchTagDto,
  ): Promise<any> {
    return this.tagService.getTags(params);
  }

  @Put(':id')
  editTag(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<any> {
    return this.tagService.editTag(id, updateTagDto, user);
  }

  @Delete(':id')
  deleteTag(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tagService.deleteTag(id);
  }
}
