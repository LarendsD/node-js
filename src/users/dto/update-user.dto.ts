import { IsEmail, Matches, Length, IsOptional } from 'class-validator';
import { message } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @Length(1, 100)
  email?: string;

  @IsOptional()
  @Matches(/[0-9]/, { message })
  @Matches(/[A-Z]/, { message })
  @Matches(/[a-z]/, { message })
  @Length(8, 100)
  password?: string;

  @IsOptional()
  @Length(1, 30)
  nickname?: string;
}
