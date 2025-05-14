import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('restaurant_category')
export class RestaurantCategory {
  @PrimaryGeneratedColumn({ name: 'restaurant_category_id', type: 'bigint' })
  restaurantCategoryId: number;

  @Column({ name: 'restaurant_category_code', type: 'varchar', length: 100 })
  restaurantCategoryCode: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn({ name: 'create_date', type: 'datetime' })
  createDate: Date;
}
