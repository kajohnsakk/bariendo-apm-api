import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { OrganizationModule } from 'src/organization/organization.module';
import { CustomerAppointmentModule } from './customer-appointment/customer-appointment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),
    OrganizationModule,
    CustomerAppointmentModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
