import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('business_user_metadata')
export class BusinessUserMetadata {
  @PrimaryGeneratedColumn({ name: 'business_user_metadata_id', type: 'bigint' })
  businessUserMetadataId: number;

  @Column({ name: 'registration_number', type: 'varchar', length: 50 })
  registrationNumber: string;

  @Column({ name: 'owner_name', type: 'varchar', length: 100 })
  ownerName: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 50 })
  phoneNumber: string;

  @Column({ name: 'store_name', type: 'varchar', length: 100 })
  storeName: string;

  @Column({ name: 'business_license_url', type: 'varchar', length: 500 })
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
