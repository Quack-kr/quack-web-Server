import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('customer_saved_restaurant')
export class CustomerSavedRestaurant {
  @PrimaryColumn({ name: 'restaurant_id', type: 'bigint' })
  restaurantId: number;

  @PrimaryColumn({ name: 'customer_id', type: 'bigint' })
  customerId: number;

  @Column({ name: 'is_saved', type: 'boolean' })
  isSaved: boolean;
}
