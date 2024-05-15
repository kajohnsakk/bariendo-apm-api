import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { OrganizationEntity } from 'src/organization/entities/organization.entity';
import { TimezoneEntity } from 'src/timezone/entities/timezone.entity';

@Entity('admins')
@Unique(['email', 'organization'])
export class AdminEntity extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  @ManyToOne(() => TimezoneEntity)
  @JoinColumn({ name: 'timezone_id' })
  timezone: TimezoneEntity;
}
