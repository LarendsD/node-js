import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchTagDto {
  @ApiProperty({
    description: 'Sort tags by sortOrder value',
    required: false,
    example: '',
  })
  @IsOptional()
  sortByOrder?: string;

  @ApiProperty({
    description: 'Sort tags by name',
    required: false,
    example: '',
  })
  @IsOptional()
  sortByName?: string;

  @ApiProperty({
    description: 'Value of skipped values in selection',
    required: false,
    example: 10,
  })
  @IsOptional()
  offset?: number;

  @ApiProperty({
    description: 'Length of selection',
    required: false,
    example: 10,
  })
  @IsOptional()
  length?: number;
}
