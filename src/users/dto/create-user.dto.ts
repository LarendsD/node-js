import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const message =
  'password must contain at least one number, one capital letter and one little letter';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of user',
    maximum: 100,
    example: 'example@exe.com',
  })
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @ApiProperty({
    description:
      'Password of user, must contain at leash one little and one capical letter and one number',
    minimum: 8,
    maximum: 100,
    example: 'Example123',
  })
  @IsNotEmpty()
  @Matches(/[0-9]/, { message })
  @Matches(/[A-Z]/, { message })
  @Matches(/[a-z]/, { message })
  @Length(8, 100)
  password: string;

  @ApiProperty({
    description: 'Nickname of user',
    maximum: 30,
    example: 'nickname',
  })
  @IsNotEmpty()
  @Length(1, 30)
  nickname: string;
}
