import { PartialType } from '@nestjs/swagger';
import { CreateProviderUserDto } from './create-provider-user.dto';

export class UpdateProviderUserDto extends PartialType(CreateProviderUserDto) {}
