import { BeforeInsert, Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('organizations')
export class OrganizationEntity extends BaseEntity {
  @Column({ unique: true, length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  slug: string;

  @BeforeInsert()
  generateSlug() {
    this.slug = this.name.toLowerCase().replace(/ /g, '-');
  }
}
