import { PartialType } from '@nestjs/swagger';
import { CreateAdminServiceDto } from './create-admin-service.dto';

export class UpdateAdminServiceDto extends PartialType(CreateAdminServiceDto) {}
