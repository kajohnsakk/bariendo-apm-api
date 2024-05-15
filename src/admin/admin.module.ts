import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProviderUserModule } from './provider-user/provider-user.module';
import { AdminServiceModule } from './admin-service/admin-service.module';
import { OrganizationModule } from 'src/organization/organization.module';
import { AdminEntity } from './entities/admin.entity';
import { TimezoneModule } from 'src/timezone/timezone.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    TimezoneModule,
    OrganizationModule,
    ProviderUserModule,
    AdminServiceModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
