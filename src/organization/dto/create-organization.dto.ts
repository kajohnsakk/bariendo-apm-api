import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Name of the organization',
    example: 'Organization Test',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
