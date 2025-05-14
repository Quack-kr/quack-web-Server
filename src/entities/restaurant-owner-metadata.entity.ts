import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('restaurant_owner_metadata')
export class RestaurantOwnerMetadata {
  @PrimaryGeneratedColumn({
    name: 'restaurant_owner_metadata_id',
    type: 'bigint',
  })
  restaurantOwnerMetadataId: number;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column({ name: 'simple_description', type: 'varchar2', length: 255 })
  simpleDescription: string;

  @Column({ name: 'detail_description', type: 'text' })
  detailDescription: string;

  @Column({ name: 'effort_message', type: 'varchar2', length: 255 })
  effortMessage: string;
}
