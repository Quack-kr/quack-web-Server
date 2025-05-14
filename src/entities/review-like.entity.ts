import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Review } from './review.entity';

@Entity('review_like')
export class ReviewLike {
  @PrimaryGeneratedColumn({ name: 'review_like_id', type: 'bigint' })
  reviewLikeId: number;

  @ManyToOne(() => Review)
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @Column({ name: 'customer_id', type: 'bigint' })
  customerId: number;

  @Column({ name: 'review_like_type', type: 'varchar', length: 20 })
  reviewLikeType: string;
}
