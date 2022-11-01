import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 254,
    unique: true,
  })
  email: string;

  @Column({ length: 50 })
  fullName: string;

  @Column({ length: 254, select: false })
  password: string;

  @Column('simple-array') //that
  roles: string[];

  @Column({
    type: 'bool',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @BeforeInsert()
  formatFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();

    if (this.roles === undefined) {
      this.roles = ['user'];
    }

    if (this.roles.length === 0) {
      this.roles = ['user'];
    }
  }

  @BeforeUpdate()
  formatFieldsBeforeUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
