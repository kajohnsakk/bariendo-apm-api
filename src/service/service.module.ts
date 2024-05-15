import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceEntity } from './entities/service.entity';
import { ServiceService } from './service.service';
import { OrganizationModule } from 'src/organization/organization.module';
import { ServiceController } from './service.controller';
import { Provider } from 'src/provider/entities/provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceEntity, Provider]),
    OrganizationModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
