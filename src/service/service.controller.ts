import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';

import { ServiceService } from './service.service';
import { OrganizationGuard } from 'src/auth/organization.guard';

@UseGuards(OrganizationGuard)
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  findAll(@Request() req) {
    const { id: organizationId } = req.organization;
    return this.serviceService.findAll({ organizationId });
  }

  @Get(':serviceId/providers')
  getServiceProviders(@Request() req, @Param('serviceId') serviceId: string) {
    const { id: organizationId } = req.organization;
    return this.serviceService.getServiceProviders({
      serviceId,
      organizationId,
    });
  }

  @Get(':serviceId/providers/:providerId')
  getServiceProvider(
    @Request() req,
    @Param('serviceId') serviceId: string,
    @Param('providerId') providerId: string,
  ) {
    const { id: organizationId } = req.organization;

    return this.serviceService.getServiceProviderById({
      serviceId,
      providerId,
      organizationId,
    });
  }
}
