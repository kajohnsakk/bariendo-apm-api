import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProviderUserService } from './provider.service';
import { ProviderUserController } from './provider.controller';
import { Provider } from './entities/provider.entity';
import { OrganizationModule } from 'src/organization/organization.module';
import { WorkingHourEntity } from './entities/working-hour.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider, WorkingHourEntity]),
    OrganizationModule,
  ],
  controllers: [ProviderUserController],
  providers: [ProviderUserService],
  exports: [ProviderUserService],
})
export class ProviderModule {}
