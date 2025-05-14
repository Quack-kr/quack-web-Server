import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('restaurant_hours')
export class RestaurantHours {
  @PrimaryGeneratedColumn({ name: 'restaurant_hours_id', type: 'bigint' })
  restaurantHoursId: number;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column({ name: 'day_of_week', type: 'varchar2', length: 10 })
  dayOfWeek: string;

  @Column({ name: 'open_time', type: 'time' })
  openTime: string;

  @Column({ name: 'last_order_time', type: 'time' })
  lastOrderTime: string;

  @Column({ name: 'close_time', type: 'time' })
  closeTime: string;

  @Column({ name: 'is_closed', type: 'boolean' })
  isClosed: boolean;
}
