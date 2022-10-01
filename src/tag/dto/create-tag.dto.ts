import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of tag',
    maximum: 30,
    example: 'myTag',
  })
  @Length(1, 30)
  name: string;

  @IsOptional()
  @ApiProperty({
    description: 'Sort order of tag',
    default: 0,
    required: false,
    example: '4',
  })
  @Matches(/[0-9]/)
  sortOrder: string;
}
