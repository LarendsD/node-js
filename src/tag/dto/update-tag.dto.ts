import { Matches, Length, IsOptional } from 'class-validator';

export class UpdateTagDto {
  @IsOptional()
  @Length(1, 30)
  name?: string;

  @IsOptional()
  @Matches(/[0-9]/)
  sortOrder?: string;
}
