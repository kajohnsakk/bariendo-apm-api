import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { OrganizationService } from 'src/organization/organization.service';
import { AppointmentEntity } from './entities/appointment.entity';
import { ProviderUserService } from '../admin/provider-user/provider-user.service';
import { OrganizationQueryDto } from 'src/common/dto/organization-query.dto';
import { CustomerQueryDto } from 'src/common/dto/customer-query.dto';
import { CustomerEntity } from 'src/customer/entities/customer.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    private readonly organizationService: OrganizationService,
    private readonly providerUserService: ProviderUserService,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { customerId, providerId, organizationId, slot } =
      createAppointmentDto;

    const provider = await this.providerUserService.findOne(providerId);
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const organization = await this.organizationService.findOne(organizationId);
    const service = provider.service;

    const appointments = slot.map((s) => ({
      provider,
      customer,
      service,
      organization,
      datetime: s,
    }));

    const newAppointment = this.appointmentRepository.create(appointments);

    const createdAppointment =
      await this.appointmentRepository.save(newAppointment);

    return createdAppointment;
  }

  findAll({
    organizationId,
    customerId,
  }: OrganizationQueryDto & CustomerQueryDto) {
    return this.appointmentRepository.find({
      where: {
        organization: {
          id: organizationId,
        },
        customer: {
          id: customerId,
        },
        deletedAt: null,
      },

      order: {
        datetime: 'ASC',
      },
      relations: ['provider', 'service', 'organization', 'customer'],
    });
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['provider', 'service', 'organization', 'customer'],
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);

    return this.appointmentRepository.softDelete(appointment.id);
  }
}
