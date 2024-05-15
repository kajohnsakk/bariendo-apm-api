import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateWorkingHourDto } from './dto/create-working-hour.dto';
import { Provider } from './entities/provider.entity';
import { WorkingHourEntity } from './entities/working-hour.entity';
import { UpdateWorkingHourDto } from './dto/update-working-hour.dto';

@Injectable()
export class ProviderUserService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerUserRepository: Repository<Provider>,
    @InjectRepository(WorkingHourEntity)
    private readonly workingHourRepository: Repository<WorkingHourEntity>,
  ) {}

  findAll(options: FindManyOptions<Provider> = {}) {
    return this.providerUserRepository.find({
      ...options,
      relations: ['workingHours'],
    });
  }

  async findOne(id: string) {
    const provider = await this.providerUserRepository.findOne({
      where: { id },
      relations: ['workingHours'],
    });

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return provider;
  }

  async remove(id: string) {
    const provider = await this.findOne(id);

    return this.providerUserRepository.remove(provider);
  }

  async createWorkingHour(
    providerId: string,
    createWorkingHourDto: CreateWorkingHourDto,
  ) {
    const provider = await this.findOne(providerId);

    const workingHour = this.workingHourRepository.create({
      ...createWorkingHourDto,
      provider: { id: provider.id },
    });

    return this.workingHourRepository.save(workingHour);
  }

  async updateWorkingHour(
    providerId: string,
    workingHourId: string,
    updateWorkingHourDto: UpdateWorkingHourDto,
  ) {
    const workingHour = await this.workingHourRepository.findOne({
      where: {
        id: workingHourId,
        provider: {
          id: providerId,
        },
      },
    });

    if (!workingHour) {
      throw new NotFoundException('Working hour not found');
    }

    return this.workingHourRepository.save({
      ...workingHour,
      ...updateWorkingHourDto,
    });
  }

  findWorkingHour(providerId: string, workingHourId: string) {
    return this.workingHourRepository.findOne({
      where: {
        id: workingHourId,
        provider: {
          id: providerId,
        },
      },
    });
  }

  findAllWorkingHours(providerId: string) {
    return this.workingHourRepository.find({
      where: {
        provider: {
          id: providerId,
        },
      },
    });
  }

  async removeWorkingHour(providerId: string, workingHourId: string) {
    const workingHour = await this.workingHourRepository.findOne({
      where: {
        id: workingHourId,
        provider: {
          id: providerId,
        },
      },
    });

    if (!workingHour) {
      throw new NotFoundException('Working hour not found');
    }

    return this.workingHourRepository.remove(workingHour);
  }
}
