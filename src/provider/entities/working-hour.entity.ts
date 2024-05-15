import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

import { Provider } from './provider.entity';

export type WorkingHour = {
  start: number;
  end: number;
};

@Entity('working_hours')
export class WorkingHourEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'day_of_week' })
  dayOfWeek: number;

  @Column({ name: 'working_hours', type: 'jsonb', default: [] })
  workingHours: WorkingHour[];

  @ManyToOne(() => Provider, { cascade: true })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;
}
