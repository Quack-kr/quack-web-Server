import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('menu_category')
export class MenuCategory {
  @PrimaryGeneratedColumn({ name: 'menu_category_id', type: 'bigint' })
  menuCategoryId: number;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column({ name: 'sort_order', type: 'int' })
  sortOrder: number;

  @Column({ name: 'category_name', type: 'varchar', length: 100 })
  categoryName: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;
}
