import { IsOptional } from 'class-validator';

export class SearchTagDto {
  @IsOptional()
  sortByOrder?: string;

  @IsOptional()
  sortByName?: string;

  @IsOptional()
  offset?: number;

  @IsOptional()
  length?: number;
}
