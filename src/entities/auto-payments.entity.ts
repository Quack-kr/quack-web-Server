import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { AdPaymentLogs } from './ad-payment-logs.entity';

@Entity('auto_payments')
export class AutoPayments {
  @PrimaryGeneratedColumn({ name: 'auto_payments_id', type: 'bigint' })
  autoPaymentsId: number;

  @ManyToOne(() => AdPaymentLogs)
  @JoinColumn({ name: 'payment_log_id' })
  paymentLog: AdPaymentLogs;

  @Column({ name: 'owner_id', type: 'bigint' })
  ownerId: number;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
