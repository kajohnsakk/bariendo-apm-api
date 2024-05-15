import { Module } from '@nestjs/common';

import { CustomerAppointmentService } from './customer-appointment.service';
import { CustomerAppointmentController } from './customer-appointment.controller';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  imports: [AppointmentModule, OrganizationModule],
  controllers: [CustomerAppointmentController],
  providers: [CustomerAppointmentService],
  exports: [CustomerAppointmentService],
})
export class CustomerAppointmentModule {}
