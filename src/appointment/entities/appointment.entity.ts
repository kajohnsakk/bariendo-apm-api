import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { OrganizationEntity } from 'src/organization/entities/organization.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

import { ServiceEntity } from 'src/service/entities/service.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { CustomerEntity } from 'src/customer/entities/customer.entity';

@Entity('appointments')
export class AppointmentEntity extends BaseEntity {
  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @ManyToOne(() => ServiceEntity)
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  @Column({ name: 'datetime' })
  datetime: Date;
}
