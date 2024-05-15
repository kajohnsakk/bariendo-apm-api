import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'The id of the customer',
    example: '1',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @ApiProperty({
    description: 'The id of the provider',
    example: '1',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  providerId: string;

  @ApiProperty({
    description: 'The id of the organization',
    example: 1,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  organizationId: string;

  @ApiProperty({
    description: 'The slot of the appointment',
    example: ['2021-09-01T00:00:00.000Z', '2021-09-01T01:00:00.000Z '],
    required: true,
    type: [Date],
  })
  @IsNotEmpty()
  @IsDate({ each: true })
  @Type(() => Date)
  slot: Date[];
}
