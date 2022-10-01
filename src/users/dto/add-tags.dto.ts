import { IsArray } from 'class-validator';

export class AddTagsDto {
  @IsArray()
  tags: number[];
}
