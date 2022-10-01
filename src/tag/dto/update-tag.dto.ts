import { Matches, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty({
    description: 'New name of tag',
    required: false,
    maximum: 30,
    example: 'EditedTag',
  })
  @IsOptional()
  @Length(1, 30)
  name?: string;

  @ApiProperty({
    description: 'New order sort of tag',
    required: false,
    example: '3',
  })
  @IsOptional()
  @Matches(/[0-9]/)
  sortOrder?: string;
}
