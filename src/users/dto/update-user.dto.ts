import { IsEmail, Matches, Length, IsOptional } from 'class-validator';
import { message } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'New email of user',
    maximum: 100,
    required: false,
    example: 'newEmail@mail.ru',
  })
  @IsOptional()
  @IsEmail()
  @Length(1, 100)
  email?: string;

  @ApiProperty({
    description:
      'New password of user, must contain at leash one little and one capical letter and one number',
    minimum: 8,
    maximum: 100,
    required: false,
    example: 'newExamplePass12',
  })
  @IsOptional()
  @Matches(/[0-9]/, { message })
  @Matches(/[A-Z]/, { message })
  @Matches(/[a-z]/, { message })
  @Length(8, 100)
  password?: string;

  @ApiProperty({
    description: 'New nickname of user',
    maximum: 30,
    required: false,
    example: 'myNewNickname',
  })
  @IsOptional()
  @Length(1, 30)
  nickname?: string;
}
