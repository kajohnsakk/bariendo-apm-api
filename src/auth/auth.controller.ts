import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { OrganizationGuard } from './organization.guard';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UseGuards(OrganizationGuard)
  @ApiHeader({
    name: 'organization-id',
    description: 'Organization Id',
    required: true,
  })
  signIn(@Request() req, @Body() signInDto: SignInDto) {
    const { id: organizationId } = req.organization;

    return this.authService.signIn(signInDto, organizationId);
  }

  @Post('sign-up')
  @UseGuards(OrganizationGuard)
  @ApiHeader({
    name: 'organization-id',
    description: 'Organization Id',
    required: true,
  })
  signUp(@Request() req, @Body() signUpDto: SignUpDto) {
    const { id: organizationId } = req.organization;
    return this.authService.signUp(signUpDto, organizationId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.role, req.user.id);
  }
}
