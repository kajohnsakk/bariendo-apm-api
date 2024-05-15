import {
  BaseEntity as Base,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcryptjs from 'bcryptjs';

export class BaseEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt: Date;

  password?: string;

  @BeforeInsert()
  @BeforeUpdate()
  generatePassword() {
    if (this.password) {
      this.password = this.generatePasswordHash(this.password);
    }
  }

  private generatePasswordHash(password: string): string {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
  }

  comparePassword(password: string): boolean {
    return bcryptjs.compareSync(password, this.password);
  }
}
