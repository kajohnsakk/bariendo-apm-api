import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { CustomerAppointmentService } from './customer-appointment.service';
import { CreateCustomerAppointmentDto } from './dto/create-customer-appointment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { OrganizationGuard } from 'src/auth/organization.guard';
import { Roles } from 'src/auth/role.decorator';

@ApiBearerAuth()
@ApiHeader({
  name: 'organization-id',
  description: 'Organization Id',
  required: true,
})
@UseGuards(OrganizationGuard, AuthGuard, RolesGuard)
@ApiTags('Customer')
@Controller('customer/appointments')
export class CustomerAppointmentController {
  constructor(
    private readonly customerAppointmentService: CustomerAppointmentService,
  ) {}

  @Post()
  @Roles(['customer'])
  create(
    @Request() req,
    @Body() createCustomerAppointmentDto: CreateCustomerAppointmentDto,
  ) {
    const { sub: customerId } = req.user;
    const { id: organizationId } = req.organization;

    return this.customerAppointmentService.create({
      customerId,
      organizationId,
      ...createCustomerAppointmentDto,
    });
  }

  @Get()
  @Roles(['customer'])
  findAll(@Request() req) {
    const { sub: customerId } = req.user;
    const { id: organizationId } = req.organization;

    return this.customerAppointmentService.findAll({
      customerId,
      organizationId,
    });
  }

  @Get(':id')
  @Roles(['customer'])
  findOne(@Param('id') id: string) {
    return this.customerAppointmentService.findOne(id);
  }

  @Delete(':id')
  @Roles(['customer'])
  remove(@Param('id') id: string) {
    return this.customerAppointmentService.remove(id);
  }
}
