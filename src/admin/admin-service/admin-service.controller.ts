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

import { AdminServiceService } from './admin-service.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';
import { UpdateServiceDto } from 'src/service/dto/update-service.dto';
import { Roles } from 'src/auth/role.decorator';
import { OrganizationGuard } from 'src/auth/organization.guard';

@ApiBearerAuth()
@ApiHeader({
  name: 'organization-id',
  description: 'Organization Id',
  required: true,
})
@UseGuards(OrganizationGuard, AuthGuard, RolesGuard)
@ApiTags('Admin')
@Controller('admin/services')
export class AdminServiceController {
  constructor(private readonly adminServiceService: AdminServiceService) {}

  @Post()
  @Roles(['admin'])
  create(@Request() req, @Body() createServiceDto: CreateServiceDto) {
    const { id: organizationId } = req.organization;

    return this.adminServiceService.create({
      organizationId,
      ...createServiceDto,
    });
  }

  @Get()
  @Roles(['admin'])
  findAll(@Request() req) {
    const { id: organizationId } = req.organization;

    return this.adminServiceService.findAll({ organizationId });
  }

  @Get(':id')
  @Roles(['admin'])
  findOne(@Param('id') id: string) {
    return this.adminServiceService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const { id: organizationId } = req.organization;

    return this.adminServiceService.update(id, {
      organizationId,
      ...updateServiceDto,
    });
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.adminServiceService.remove(id);
  }
}
