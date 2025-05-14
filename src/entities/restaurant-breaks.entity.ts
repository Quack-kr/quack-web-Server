import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('restaurant_breaks')
export class RestaurantBreaks {
  @PrimaryGeneratedColumn({ name: 'restaurant_breaks_id', type: 'bigint' })
  restaurantBreaksId: number;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column({ name: 'day_of_week', type: 'varchar2', length: 10 })
  dayOfWeek: string;

  @Column({ name: 'break_start', type: 'time' })
  breakStart: string;

  @Column({ name: 'break_end', type: 'time' })
  breakEnd: string;

  @Column({ name: 'last_order_time', type: 'time' })
  lastOrderTime: string;
}
