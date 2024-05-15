import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from './entities/appointment.entity';
import { ProviderUserModule } from 'src/admin/provider-user/provider-user.module';
import { OrganizationModule } from 'src/organization/organization.module';
import { CustomerEntity } from 'src/customer/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity, CustomerEntity]),
    ProviderUserModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
