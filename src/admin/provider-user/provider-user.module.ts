import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProviderUserService } from './provider-user.service';
import { ProviderUserController } from './provider-user.controller';
import { Provider } from 'src/provider/entities/provider.entity';
import { OrganizationModule } from 'src/organization/organization.module';
import { TimezoneModule } from 'src/timezone/timezone.module';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider]),
    TimezoneModule,
    OrganizationModule,
    ServiceModule,
  ],
  controllers: [ProviderUserController],
  providers: [ProviderUserService],
  exports: [ProviderUserService],
})
export class ProviderUserModule {}
