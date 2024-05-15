import { Injectable } from '@nestjs/common';

import { AppointmentService } from 'src/appointment/appointment.service';
import { CreateAppointmentDto } from 'src/appointment/dto/create-appointment.dto';
import { OrganizationQueryDto } from 'src/common/dto/organization-query.dto';
import { CustomerQueryDto } from 'src/common/dto/customer-query.dto';

@Injectable()
export class CustomerAppointmentService {
  constructor(private readonly appointmentService: AppointmentService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const createdAppointment =
      await this.appointmentService.create(createAppointmentDto);

    return createdAppointment;
  }

  findAll({
    customerId,
    organizationId,
  }: OrganizationQueryDto & CustomerQueryDto) {
    return this.appointmentService.findAll({
      customerId,
      organizationId,
    });
  }

  findOne(id: string) {
    return this.appointmentService.findOne(id);
  }

  remove(id: string) {
    return this.appointmentService.remove(id);
  }
}
