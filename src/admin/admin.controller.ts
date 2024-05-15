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

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from 'src/auth/auth.enum';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { OrganizationGuard } from 'src/auth/organization.guard';
import { AdminService } from './admin.service';

@ApiBearerAuth()
@ApiHeader({
  name: 'organization-id',
  description: 'Organization Id',
  required: true,
})
@UseGuards(OrganizationGuard, AuthGuard, RolesGuard)
@ApiTags('Admin')
@Controller('/admin/admins')
export class AdminController {
  constructor(private readonly adminUserService: AdminService) {}

  @Post()
  @Roles([UserRole.ADMIN])
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminUserService.create(createAdminDto);
  }

  @Get()
  @Roles([UserRole.ADMIN])
  findAll(@Request() req) {
    const { id: organizationId } = req.organization;

    return this.adminUserService.findAll({ organizationId });
  }

  @Get(':id')
  @Roles([UserRole.ADMIN])
  findOne(@Param('id') id: string) {
    return this.adminUserService.findOne(id);
  }

  @Patch(':id')
  @Roles([UserRole.ADMIN])
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminUserService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @Roles([UserRole.ADMIN])
  remove(@Param('id') id: string) {
    return this.adminUserService.remove(id);
  }
}
