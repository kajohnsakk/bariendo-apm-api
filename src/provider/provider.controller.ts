import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Post,
  Body,
  Request,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { ProviderUserService } from './provider.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrganizationGuard } from 'src/auth/organization.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/role.decorator';
import { CreateWorkingHourDto } from './dto/create-working-hour.dto';

@ApiBearerAuth()
@ApiHeader({
  name: 'organization-id',
  description: 'Organization Id',
  required: true,
})
@UseGuards(OrganizationGuard, AuthGuard, RolesGuard)
@ApiTags('Provider')
@Controller('provider')
export class ProviderUserController {
  constructor(private readonly providerUserService: ProviderUserService) {}

  @Post('working-hours')
  @Roles(['provider'])
  createWorkingHours(
    @Request() req,
    @Body() createWorkingHourDto: CreateWorkingHourDto,
  ) {
    console.log(
      '🚀 ~ ProviderUserController ~ createWorkingHourDto:',
      createWorkingHourDto,
    );
    const { sub: providerId } = req.user;

    return this.providerUserService.createWorkingHour(
      providerId,
      createWorkingHourDto,
    );
  }

  @Patch('working-hours/:workingHourId')
  @Roles(['provider'])
  updateWorkingHours(
    @Request() req,
    @Param('workingHourId') workingHourId: string,
    @Body() updateWorkingHourDto: CreateWorkingHourDto,
  ) {
    const { sub: providerId } = req.user;

    return this.providerUserService.updateWorkingHour(
      providerId,
      workingHourId,
      updateWorkingHourDto,
    );
  }

  @Delete('working-hours/:workingHourId')
  @Roles(['provider'])
  removeWorkingHours(
    @Request() req,
    @Param('workingHourId') workingHourId: string,
  ) {
    const { sub: providerId } = req.user;

    return this.providerUserService.removeWorkingHour(
      providerId,
      workingHourId,
    );
  }

  @Get('working-hours')
  @Roles(['provider'])
  findAllWorkingHours(@Request() req) {
    const { sub: providerId } = req.user;

    return this.providerUserService.findAllWorkingHours(providerId);
  }

  @Get('working-hours/:workingHourId')
  @Roles(['provider'])
  findWorkingHour(
    @Request() req,
    @Param('workingHourId') workingHourId: string,
  ) {
    const { sub: providerId } = req.user;

    return this.providerUserService.findWorkingHour(providerId, workingHourId);
  }
}
