import { Injectable } from '@nestjs/common';
import { OrganizationQueryDto } from 'src/common/dto/organization-query.dto';

import { CreateServiceDto } from 'src/service/dto/create-service.dto';
import { UpdateServiceDto } from 'src/service/dto/update-service.dto';
import { ServiceService } from 'src/service/service.service';

@Injectable()
export class AdminServiceService {
  constructor(private readonly serviceService: ServiceService) {}

  async create(createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  findAll({ organizationId }: OrganizationQueryDto) {
    return this.serviceService.findAll({
      organizationId,
    });
  }

  async findOne(id: string) {
    return this.serviceService.findOne(id);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  async remove(id: string) {
    return this.serviceService.remove(id);
  }
}
