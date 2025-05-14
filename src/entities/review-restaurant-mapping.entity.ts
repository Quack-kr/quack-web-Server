import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Review } from './review.entity';
import { RestaurantKeyword } from './restaurant-keyword.entity';

@Entity('review_restaurant_mapping')
export class ReviewRestaurantMapping {
  @PrimaryGeneratedColumn({
    name: 'review_restaurant_mapping_id',
    type: 'bigint',
  })
  reviewRestaurantMappingId: number;

  @ManyToOne(() => Review)
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @ManyToOne(() => RestaurantKeyword)
  @JoinColumn({ name: 'keyword_id' })
  keyword: RestaurantKeyword;
}
