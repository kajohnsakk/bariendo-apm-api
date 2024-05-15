import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProviderUserDto } from './dto/create-provider-user.dto';
import { UpdateProviderUserDto } from './dto/update-provider-user.dto';
import { Provider } from 'src/provider/entities/provider.entity';
import { OrganizationService } from 'src/organization/organization.service';
import { TimezoneService } from 'src/timezone/timezone.service';
import { ServiceService } from 'src/service/service.service';
import { OrganizationQueryDto } from 'src/common/dto/organization-query.dto';

@Injectable()
export class ProviderUserService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerUserRepository: Repository<Provider>,
    private readonly timezoneService: TimezoneService,
    private readonly serviceService: ServiceService,
    private readonly organizationService: OrganizationService,
  ) {}

  async create(createProviderDto: CreateProviderUserDto) {
    const {
      firstName,
      lastName,
      email,
      password,
      organizationId,
      timezoneId,
      serviceId,
    } = createProviderDto;

    const organization = await this.organizationService.findOne(organizationId);
    const service = await this.serviceService.findOne(serviceId);
    const timezone = await this.timezoneService.findOne(timezoneId);

    const providerData = {
      firstName,
      lastName,
      email,
      password,
      organization,
      timezone,
      service,
    };

    const newProvider = this.providerUserRepository.create(providerData);
    const createdProvider = await this.providerUserRepository.save(newProvider);

    return createdProvider;
  }

  findAll({ organizationId }: OrganizationQueryDto) {
    return this.providerUserRepository.find({
      where: {
        organization: {
          id: organizationId,
        },
      },
      relations: ['organization', 'timezone', 'service'],
    });
  }

  async findOne(id: string) {
    const provider = await this.providerUserRepository.findOne({
      where: { id },
      relations: ['organization', 'timezone', 'service'],
    });

    if (!provider) {
      throw new NotFoundException(`Provider not found`);
    }

    return provider;
  }

  async update(id: string, updateProviderUserDto: UpdateProviderUserDto) {
    const { timezoneId } = updateProviderUserDto;

    const timezone = await this.timezoneService.findOne(timezoneId);

    const updatedProvider = await this.providerUserRepository.preload({
      id,
      ...updateProviderUserDto,
      timezone,
    });

    if (!updatedProvider) {
      throw new NotFoundException(`Provider not found`);
    }

    return this.providerUserRepository.save(updatedProvider);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);

    return this.providerUserRepository.remove(provider);
  }
}
