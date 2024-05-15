import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { OrganizationGuard } from 'src/auth/organization.guard';
import { CustomerService } from './customer.service';

@ApiBearerAuth()
@ApiHeader({
  name: 'organization-id',
  description: 'Organization Id',
  required: true,
})
@UseGuards(OrganizationGuard, AuthGuard, RolesGuard)
@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerUserService: CustomerService) {}

  @Get()
  findOne(@Request() req) {
    const { sub: customerId } = req.user;
    return this.customerUserService.findOne(customerId);
  }
}
