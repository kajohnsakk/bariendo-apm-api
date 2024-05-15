import { Injectable } from '@nestjs/common';

import { OrganizationEntity } from './organization/entities/organization.entity';
import { TimezoneEntity } from './timezone/entities/timezone.entity';
import { ServiceEntity } from './service/entities/service.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { WorkingHourEntity } from 'src/provider/entities/working-hour.entity';
import { AdminEntity } from './admin/entities/admin.entity';

@Injectable()
export class AppService {
  constructor() {}

  async initDataTest() {
    const organization = OrganizationEntity.create([
      {
        name: 'organization1',
        slug: 'organization1',
      },
      {
        name: 'organization2',
        slug: 'organization2',
      },
    ]);

    const savedOrg = await OrganizationEntity.save(organization);

    const timezone = TimezoneEntity.create([
      {
        name: 'Bangkok',
        offset: 7,
      },
      {
        name: 'New York',
        offset: -4,
      },
    ]);

    const savedTimezone = await TimezoneEntity.save(timezone);

    const admin = AdminEntity.create([
      {
        firstName: 'admin1',
        lastName: 'admin1',
        email: 'admin1@demo.com',
        password: '123456',
        organization: savedOrg[0],
        timezone: savedTimezone[0],
      },
      {
        firstName: 'admin2',
        lastName: 'admin2',
        email: 'admin2@demo.com',
        password: '123456',
        organization: savedOrg[1],
        timezone: savedTimezone[1],
      },
    ]);

    await AdminEntity.save(admin);

    const service = ServiceEntity.create([
      {
        name: 'service1',
        organization: savedOrg[0],
      },
      {
        name: 'service2',
        organization: savedOrg[1],
      },
    ]);

    const savedService = await ServiceEntity.save(service);

    const provider = Provider.create([
      {
        firstName: 'provider1',
        lastName: 'provider1',
        email: 'provider1@demo.com',
        password: '123456',
        organization: savedOrg[0],
        timezone: savedTimezone[0],
        service: savedService[0],
      },
      {
        firstName: 'provider2',
        lastName: 'provider2',
        email: 'provider2@demo.com',
        password: '123456',
        organization: savedOrg[1],
        timezone: savedTimezone[1],
        service: savedService[1],
      },
    ]);

    const savedProvider = await Provider.save(provider);

    const workingHour = WorkingHourEntity.create([
      {
        dayOfWeek: 3,
        workingHours: [
          {
            start: 8,
            end: 12,
          },
          {
            start: 13,
            end: 17,
          },
        ],
        provider: savedProvider[0],
      },
      {
        dayOfWeek: 4,
        workingHours: [
          {
            start: 8,
            end: 12,
          },
          {
            start: 13,
            end: 17,
          },
        ],
        provider: savedProvider[1],
      },
    ]);

    await WorkingHourEntity.save(workingHour);

    return;
  }
}
