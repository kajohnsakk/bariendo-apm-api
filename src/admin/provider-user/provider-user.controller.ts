import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { ProviderUserService } from './provider-user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/auth/auth.enum';
import { Roles } from 'src/auth/role.decorator';
import { CreateProviderUserDto } from './dto/create-provider-user.dto';
import { UpdateProviderUserDto } from './dto/update-provider-user.dto';
import { OrganizationGuard } from 'src/auth/organization.guard';

@ApiBearerAuth()
@ApiHeader({
  name: 'organization-id',
  description: 'Organization Id',
  required: true,
})
@UseGuards(OrganizationGuard, AuthGuard, RolesGuard)
@ApiTags('Admin')
@Controller('admin/providers')
export class ProviderUserController {
  constructor(private readonly providerUserService: ProviderUserService) {}

  @Post()
  @Roles([UserRole.ADMIN])
  create(@Body() createProviderUserDto: CreateProviderUserDto) {
    return this.providerUserService.create(createProviderUserDto);
  }

  @Get()
  @Roles([UserRole.ADMIN])
  findAll(@Request() req) {
    const { id: organizationId } = req.organization;
    return this.providerUserService.findAll({ organizationId });
  }

  @Get(':id')
  @Roles([UserRole.ADMIN])
  findOne(@Param('id') id: string) {
    return this.providerUserService.findOne(id);
  }

  @Patch(':id')
  @Roles([UserRole.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateProviderUserDto: UpdateProviderUserDto,
  ) {
    return this.providerUserService.update(id, updateProviderUserDto);
  }

  @Delete(':id')
  @Roles([UserRole.ADMIN])
  remove(@Param('id') id: string) {
    return this.providerUserService.remove(id);
  }
}
