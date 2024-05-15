import { PickType } from '@nestjs/swagger';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';

export class CreateAdminServiceDto extends PickType(CreateServiceDto, [
  'name',
]) {}
