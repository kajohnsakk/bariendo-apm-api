import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { AdminEntity } from 'src/admin/entities/admin.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { SignInDto } from './dto/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './auth.enum';
import { SignUpDto } from './dto/sign-up.dto';
import { OrganizationService } from 'src/organization/organization.service';
import { TimezoneService } from 'src/timezone/timezone.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AdminEntity)
    readonly adminRepository: Repository<AdminEntity>,
    @InjectRepository(Provider)
    readonly providerRepository: Repository<Provider>,
    @InjectRepository(CustomerEntity)
    readonly customerRepository: Repository<CustomerEntity>,
    private readonly organizationService: OrganizationService,
    private readonly timezoneService: TimezoneService,
  ) {}

  async signIn(
    { email, password, userScope }: SignInDto,
    organizationId: string,
  ) {
    console.log('🚀 ~ AuthService ~ userScope:', userScope);
    console.log('🚀 ~ AuthService ~ password:', password);
    console.log('🚀 ~ AuthService ~ email:', email);
    const user = await this.getUserByScope(email, organizationId, userScope);
    console.log('🚀 ~ AuthService ~ user:', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: userScope };
    const accessToken = await this.jwtService.signAsync(payload);

    delete user.password;

    return {
      user,
      accessToken,
    };
  }

  async signUp(signUpDto: SignUpDto, organizationId: string) {
    const { firstName, lastName, email, password, timezoneId } = signUpDto;

    const organization = await this.organizationService.findOne(organizationId);
    const timezone = await this.timezoneService.findOne(timezoneId);

    const signUpData = {
      firstName,
      lastName,
      email,
      password,
      organization,
      timezone,
    };

    const user = this.customerRepository.create(signUpData);
    const signedUp = await this.customerRepository.save(user);

    return signedUp;
  }

  getUserProfile(userScope: UserRole, userId: string) {
    const userRepository = this[`${userScope}Repository`];

    return userRepository.findOne({
      where: { id: userId },
      relations: ['organization', 'timezone'],
    });
  }

  private getUserByScope(
    email: string,
    organizationId: string,
    userScope: UserRole,
  ) {
    const userRepository = this[`${userScope}Repository`];

    return userRepository
      .createQueryBuilder(userScope)
      .addSelect(`${userScope}.password`)
      .where(`${userScope}.email = :email`, { email })
      .andWhere(`${userScope}.organization_id = :organizationId`, {
        organizationId,
      })
      .getOne();
  }
}
