import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminEntity } from './entities/admin.entity';
import { TimezoneService } from 'src/timezone/timezone.service';
import { OrganizationService } from '../organization/organization.service';
import { OrganizationQueryDto } from 'src/common/dto/organization-query.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminUserRepository: Repository<AdminEntity>,
    private readonly timezoneService: TimezoneService,
    private readonly organizationService: OrganizationService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { firstName, lastName, email, password, organizationId, timezoneId } =
      createAdminDto;

    const organization = await this.organizationService.findOne(organizationId);
    const timezone = await this.timezoneService.findOne(timezoneId);

    const adminData = {
      firstName,
      lastName,
      email,
      password,
      organization,
      timezone,
    };

    const newAdmin = this.adminUserRepository.create(adminData);
    const createdAdmin = await this.adminUserRepository.save(newAdmin);

    return createdAdmin;
  }

  findAll({ organizationId }: OrganizationQueryDto) {
    return this.adminUserRepository.find({
      where: {
        organization: {
          id: organizationId,
        },
      },
      relations: ['organization', 'timezone'],
    });
  }

  async findOne(id: string) {
    const admin = await this.adminUserRepository.findOne({
      where: { id },
      relations: ['organization', 'timezone'],
    });

    if (!admin) {
      throw new NotFoundException(`Admin not found`);
    }

    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const { organizationId, timezoneId } = updateAdminDto;

    const organization = await this.organizationService.findOne(organizationId);
    const timezone = await this.timezoneService.findOne(timezoneId);

    const updatedAdmin = await this.adminUserRepository.preload({
      id,
      ...updateAdminDto,
      organization,
      timezone,
    });

    if (!updatedAdmin) {
      throw new NotFoundException(`Admin not found`);
    }

    return this.adminUserRepository.save(updatedAdmin);
  }

  async remove(id: string) {
    const admin = await this.findOne(id);

    return this.adminUserRepository.remove(admin);
  }
}
