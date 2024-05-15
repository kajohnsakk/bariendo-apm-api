import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
  VirtualColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { OrganizationEntity } from 'src/organization/entities/organization.entity';
import { TimezoneEntity } from 'src/timezone/entities/timezone.entity';
import { ServiceEntity } from 'src/service/entities/service.entity';
import { WorkingHourEntity } from './working-hour.entity';
import { AppointmentEntity } from 'src/appointment/entities/appointment.entity';

@Entity('providers')
@Unique(['email', 'organization'])
export class Provider extends BaseEntity {
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

  @ManyToOne(() => ServiceEntity)
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @OneToMany(() => WorkingHourEntity, (workingHour) => workingHour.provider)
  workingHours: WorkingHourEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.provider)
  appointments: AppointmentEntity[];

  @VirtualColumn({
    query: (alias) =>
      `SELECT ARRAY_AGG(DISTINCT datetime) FROM appointments WHERE provider_id = ${alias}.id AND datetime >= NOW()`,
  })
  disabledSlots: Date[];
}
