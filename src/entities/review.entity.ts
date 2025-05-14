import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id', type: 'bigint' })
  reviewId: number;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @Column({ name: 'content', type: 'text' })
  content: string;
}
