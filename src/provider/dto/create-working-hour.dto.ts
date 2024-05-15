import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { WorkingHour } from '../entities/working-hour.entity';
import { Type } from 'class-transformer';

export class CreateWorkingHourDto {
  @ApiProperty({
    description: 'Day of the week',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  dayOfWeek: number;

  @ApiProperty({
    example: [
      {
        start: 9,
        end: 11,
      },
      {
        start: 14,
        end: 16,
      },
    ],
    description: 'Working hours',
    required: true,
    type: [Object],
  })
  @IsNotEmpty()
  @Type(() => Object)
  workingHours: WorkingHour[];
}
