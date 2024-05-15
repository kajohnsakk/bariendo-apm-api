import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TimezoneEntity } from './entities/timezone.entity';

@Injectable()
export class TimezoneService {
  constructor(
    @InjectRepository(TimezoneEntity)
    private readonly timezoneRepository: Repository<TimezoneEntity>,
  ) {}

  async findOne(id: string) {
    const timezone = await this.timezoneRepository.findOne({
      where: { id },
    });

    if (!timezone) {
      throw new NotFoundException('Timezone not found');
    }

    return timezone;
  }
}
