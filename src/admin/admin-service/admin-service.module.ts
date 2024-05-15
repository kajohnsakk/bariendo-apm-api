import { Module } from '@nestjs/common';

import { AdminServiceService } from './admin-service.service';
import { AdminServiceController } from './admin-service.controller';
import { ServiceModule } from 'src/service/service.module';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  imports: [ServiceModule, OrganizationModule],
  controllers: [AdminServiceController],
  providers: [AdminServiceService],
  exports: [AdminServiceService],
})
export class AdminServiceModule {}
