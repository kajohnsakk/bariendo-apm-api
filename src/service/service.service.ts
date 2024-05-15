import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { OrganizationService } from 'src/organization/organization.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceEntity } from './entities/service.entity';
import { OrganizationQueryDto } from 'src/common/dto/organization-query.dto';
import { Provider } from 'src/provider/entities/provider.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    private readonly organizationService: OrganizationService,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const { organizationId } = createServiceDto;

    const organization = await this.organizationService.findOne(organizationId);

    const service = this.serviceRepository.create({
      organization,
      ...createServiceDto,
    });

    return this.serviceRepository.save(service);
  }

  findAll({ organizationId }: OrganizationQueryDto) {
    return this.serviceRepository.find({
      where: {
        organization: {
          id: organizationId,
        },
      },
    });
  }

  async findOne(id: string) {
    const service = await this.serviceRepository.findOne({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const updateService = await this.serviceRepository.preload({
      id,
      ...updateServiceDto,
    });

    if (!updateService) {
      throw new NotFoundException('Service not found');
    }

    return this.serviceRepository.save(updateService);
  }

  async remove(id: string) {
    const service = await this.findOne(id);

    return this.serviceRepository.softDelete(service.id);
  }

  async getServiceProviders({
    serviceId,
    organizationId,
  }: {
    serviceId: string;
    organizationId: string;
  }) {
    const service = await this.findOne(serviceId);

    return this.providerRepository.find({
      where: {
        organization: {
          id: organizationId,
        },
        service: {
          id: service.id,
        },
      },
      relations: ['organization', 'timezone', 'service'],
    });
  }

  async getServiceProviderById({
    serviceId,
    providerId,
    organizationId,
  }: {
    serviceId: string;
    providerId: string;
    organizationId: string;
  }) {
    const service = await this.findOne(serviceId);

    const provider = await this.providerRepository.findOne({
      where: {
        id: providerId,
        service: {
          id: service.id,
        },
        organization: {
          id: organizationId,
        },
      },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'organization',
        'timezone',
        'service',
        'workingHours',
        'disabledSlots',
      ],
      relations: ['organization', 'timezone', 'service', 'workingHours'],
    });

    return provider;
  }
}
