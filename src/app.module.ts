import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import typeormConfig from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormModule } from './typeorm/typeorm.module';
import { AdminModule } from './admin/admin.module';
import { TimezoneModule } from './timezone/timezone.module';
import { ServiceModule } from './service/service.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './provider/provider.module';
import { CustomerModule } from './customer/customer.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
      envFilePath: ['.env'],
    }),
    TypeormModule,
    AdminModule,
    TimezoneModule,
    ServiceModule,
    AppointmentModule,
    AuthModule,
    ProviderModule,
    CustomerModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
