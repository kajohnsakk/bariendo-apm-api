import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'First name of the admin user',
    example: 'John',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the admin user',
    example: 'Doe',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Email of the admin user',
    example: 'admin@example.com',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the admin user',
    example: 'password',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Organization ID of the admin user',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    description: 'Timezone ID of the admin user',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  timezoneId: string;
}
