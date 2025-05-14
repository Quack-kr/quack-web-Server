import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('restaurant_metadata')
export class RestaurantMetadata {
  @PrimaryGeneratedColumn({ name: 'restaurant_metadata_id', type: 'bigint' })
  restaurantMetadataId: number;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column({ name: 'average_price', type: 'int' })
  averagePrice: number;

  @Column({ type: 'varchar2', length: 50 })
  parking: string;

  @Column({ name: 'is_uni_sex_toilet', type: 'boolean' })
  isUniSexToilet: boolean;
}
