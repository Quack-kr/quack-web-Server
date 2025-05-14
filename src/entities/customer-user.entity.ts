import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('customer_user')
export class CustomerUser {
  @PrimaryGeneratedColumn({ name: 'customer_user_id', type: 'bigint' })
  customerUserId: number;

  @Column({ type: 'varchar2', length: 20 })
  provider: string;

  @Column({ name: 'provider_id', type: 'varchar2', length: 255 })
  providerId: string;

  @Column({ type: 'varchar2', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar2', length: 255, unique: true })
  nickname: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date;

  @Column({ name: 'is_delete', type: 'boolean', default: false })
  isDelete: boolean;
}
