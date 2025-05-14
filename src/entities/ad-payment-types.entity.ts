import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ad_payment_types')
export class AdPaymentTypes {
  @PrimaryGeneratedColumn({ name: 'ad_payment_types_id', type: 'bigint' })
  adPaymentTypesId: number;

  @Column({ name: 'type', type: 'varchar2', length: 50 })
  type: string;

  @Column({ name: 'name', type: 'varchar2', length: 255 })
  name: string;

  @Column({ name: 'keyword', type: 'varchar2', length: 255, unique: true })
  keyword: string;

  @Column({ name: 'display_order', type: 'int' })
  displayOrder: number;

  @Column({ name: 'is_sold_out', type: 'boolean' })
  isSoldOut: boolean;

  @Column({ name: 'price', type: 'varchar2', length: 100 })
  price: string;

  @Column({ name: 'discount_rate', type: 'varchar2', length: 100 })
  discountRate: string;

  @Column({ name: 'description_off', type: 'json' })
  descriptionOff: object;

  @Column({ name: 'description_on', type: 'json' })
  descriptionOn: object;

  @Column({ name: 'top_text', type: 'varchar2', length: 255 })
  topText: string;

  @Column({ name: 'bottom_text', type: 'varchar2', length: 255 })
  bottomText: string;

  @Column({ name: 'duration_days', type: 'int' })
  durationDays: number;

  @Column({ name: 'payload_schema', type: 'json' })
  payloadSchema: object;
}
