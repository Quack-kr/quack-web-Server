import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { AdPaymentTypes } from './ad-payment-types.entity';

@Entity('ad_contents')
export class AdContents {
  @PrimaryGeneratedColumn({ name: 'ad_contents_id', type: 'bigint' })
  adContentsId: number;

  @ManyToOne(() => AdPaymentTypes)
  @JoinColumn({ name: 'ad_payment_type_id' })
  adPaymentType: AdPaymentTypes;

  @CreateDateColumn({ name: 'period_start', type: 'datetime' })
  periodStart: Date;

  @Column({ name: 'restaurant_id', type: 'bigint' })
  restaurantId: number;

  @Column({ name: 'ad_title_1', type: 'varchar', length: 255 })
  adTitle1: string;

  @Column({ name: 'ad_title_2', type: 'varchar', length: 255 })
  adTitle2: string;

  @Column({ name: 'user_description', type: 'text' })
  userDescription: string;

  @Column({ name: 'menu_json', type: 'json' })
  menuJson: object;

  @Column({ name: 'region_id', type: 'json' })
  regionId: object;

  @Column({ name: 'region_name', type: 'json' })
  regionName: object;

  @CreateDateColumn({ name: 'period_end', type: 'datetime' })
  periodEnd: Date;
}
