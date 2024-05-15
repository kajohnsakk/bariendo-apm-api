import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminEntity } from 'src/admin/entities/admin.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { OrganizationModule } from 'src/organization/organization.module';
import { TimezoneModule } from 'src/timezone/timezone.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, Provider, CustomerEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    OrganizationModule,
    TimezoneModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
