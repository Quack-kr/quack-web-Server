import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BusinessUser } from './business-user.entity';

@Entity('business_user_apply')
export class BusinessUserApply {
  @PrimaryGeneratedColumn({ name: 'business_user_apply_id', type: 'bigint' })
  businessUserApplyId: number;

  @ManyToOne(() => BusinessUser)
  @JoinColumn({ name: 'business_user_id' })
  businessUser: BusinessUser;

  @Column({ name: 'registration_number', type: 'varchar2', length: 50 })
  registrationNumber: string;

  @Column({ name: 'owner_name', type: 'varchar2', length: 100 })
  ownerName: string;

  @Column({ name: 'phone_number', type: 'varchar2', length: 50 })
  phoneNumber: string;

  @Column({ name: 'store_name', type: 'varchar2', length: 100 })
  storeName: string;

  @Column({ name: 'business_license_url', type: 'varchar2', length: 500 })
  businessLicenseUrl: string;

  @Column({ type: 'enum', enum: ['BEGIN', 'DONE', 'REJECTED'] })
  status: 'BEGIN' | 'DONE' | 'REJECTED';

  @CreateDateColumn({ name: 'create_time', type: 'datetime' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time', type: 'datetime' })
  updateTime: Date;

  @Column({ name: 'privacy_agreed_at', type: 'datetime', nullable: true })
  privacyAgreedAt?: Date;

  @Column({ type: 'text', nullable: true })
  comment?: string;
}
