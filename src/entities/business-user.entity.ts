import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('business_user')
export class BusinessUser {
  @PrimaryGeneratedColumn({ name: 'business_user_id', type: 'bigint' })
  businessUserId: number;

  @Column({ name: 'email', type: 'varchar2', length: 100 })
  email: string;

  @Column({ name: 'provider_name', type: 'varchar2', length: 100 })
  providerName: string;

  @Column({ name: 'provider_id', type: 'varchar2', length: 255 })
  providerId: string;

  @CreateDateColumn({ name: 'create_time', type: 'datetime' })
  createTime: Date;

  @DeleteDateColumn({ name: 'deleted_time', type: 'datetime', nullable: true })
  deletedTime?: Date;
}
