import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export const message =
  'password must contain at least one number, one capital letter and one little letter';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @IsNotEmpty()
  @Matches(/[0-9]/, { message })
  @Matches(/[A-Z]/, { message })
  @Matches(/[a-z]/, { message })
  @Length(8, 100)
  password: string;

  @IsNotEmpty()
  @Length(1, 30)
  nickname: string;
}
