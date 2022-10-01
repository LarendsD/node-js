import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @Length(1, 30)
  name: string;

  @IsOptional()
  @Matches(/[0-9]/)
  sortOrder: string;
}
