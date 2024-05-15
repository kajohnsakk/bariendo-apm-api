import { PickType } from '@nestjs/swagger';
import { CreateAppointmentDto } from 'src/appointment/dto/create-appointment.dto';

export class CreateCustomerAppointmentDto extends PickType(
  CreateAppointmentDto,
  ['providerId', 'slot'],
) {}
