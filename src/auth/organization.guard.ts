import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private organizationService: OrganizationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const organizationId = request.headers['organization-id'];

    if (!organizationId) {
      throw new BadRequestException('Organization ID is required');
    }

    try {
      const organization =
        await this.organizationService.findOne(organizationId);

      request['organization'] = organization;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }
}
