import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UserRole } from '../auth.enum';

export class SignInDto {
  @ApiProperty({
    description: 'Scope of the user',
    example: 'customer',
    required: true,
    enum: UserRole,
  })
  @IsNotEmpty()
  @IsString()
  userScope: UserRole;

  @ApiProperty({
    description: 'Email of the user',
    example: 'user@example.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
