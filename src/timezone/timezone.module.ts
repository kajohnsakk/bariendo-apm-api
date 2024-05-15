import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimezoneService } from './timezone.service';
import { TimezoneController } from './timezone.controller';
import { TimezoneEntity } from './entities/timezone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimezoneEntity])],
  controllers: [TimezoneController],
  providers: [TimezoneService],
  exports: [TimezoneService],
})
export class TimezoneModule {}
