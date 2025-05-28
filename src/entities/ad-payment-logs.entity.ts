import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { AdPaymentTypes } from './ad-payment-types.entity';
import { AutoPayments } from './auto-payments.entity';

@Entity('ad_payment_logs')
export class AdPaymentLogs {
  @PrimaryGeneratedColumn({ name: 'ad_payment_logs_id', type: 'bigint' })
  adPaymentLogsId: number;

  @ManyToOne(() => AdPaymentTypes)
  @JoinColumn({ name: 'ad_payment_type_id' })
  adPaymentType: AdPaymentTypes;

  @CreateDateColumn({ name: 'paid_at', type: 'datetime' })
  paidAt: Date;

  @Column({ name: 'period_start', type: 'datetime' })
  periodStart: Date;

  @Column({ name: 'restaurant_id', type: 'bigint' })
  restaurantId: number;

  @Column({ name: 'pg_provider', type: 'varchar', length: 255 })
  pgProvider: string;

  @Column({ name: 'pg_data', type: 'json' })
  pgData: object;

  @Column({ name: 'pg_id', type: 'varchar', length: 255 })
  pgId: string;

  @Column({ name: 'is_auto', type: 'boolean' })
  isAuto: boolean;

  @ManyToOne(() => AutoPayments)
  @JoinColumn({ name: 'auto_payment_id' })
  autoPayment: AutoPayments;

  @Column({ name: 'period_end', type: 'datetime' })
  periodEnd: Date;
}
