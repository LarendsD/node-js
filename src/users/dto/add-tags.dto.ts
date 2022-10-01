import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTagsDto {
  @IsArray()
  @ApiProperty({
    description: 'Tags for user',
  })
  tags: number[];
}
