import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationEntity } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    const newOrganization = this.organizationRepository.create(
      createOrganizationDto,
    );

    return this.organizationRepository.save(newOrganization);
  }

  findAll() {
    return this.organizationRepository.find();
  }

  async findOne(id: string) {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });

    if (!organization) {
      throw new NotFoundException(`Organization not found`);
    }

    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.organizationRepository.preload({
      id,
      ...updateOrganizationDto,
    });

    if (!organization) {
      throw new NotFoundException(`Organization not found`);
    }

    return this.organizationRepository.save(organization);
  }

  async remove(id: string) {
    const organization = await this.findOne(id);

    return this.organizationRepository.softRemove(organization);
  }
}
