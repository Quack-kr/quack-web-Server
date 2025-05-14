import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CustomerUser } from './customer-user.entity';

@Entity('customer_user_metadata')
export class CustomerUserMetadata {
  @PrimaryGeneratedColumn({ name: 'customer_user_metadata_id', type: 'bigint' })
  customerUserMetadataId: number;

  @ManyToOne(() => CustomerUser)
  @JoinColumn({ name: 'customer_user_id' })
  customerUser: CustomerUser;

  @Column({ name: 'profile_photo_id', type: 'bigint', nullable: true })
  profilePhotoId?: number;

  @Column({ name: 'terms_agreed', type: 'boolean' })
  termsAgreed: boolean;

  @Column({ name: 'privacy_agreed', type: 'boolean' })
  privacyAgreed: boolean;

  @Column({ name: 'location_terms_agreed', type: 'boolean' })
  locationTermsAgreed: boolean;

  @Column({ name: 'marketing_opt_in', type: 'boolean', nullable: true })
  marketingOptIn?: boolean;

  @Column({ type: 'int', nullable: true })
  decibel?: number;
}
