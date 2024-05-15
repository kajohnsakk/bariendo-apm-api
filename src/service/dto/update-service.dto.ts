import { PartialType, PickType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(
  PickType(CreateServiceDto, ['name']),
) {}
