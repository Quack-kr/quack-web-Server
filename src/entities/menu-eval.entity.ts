import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Menu } from './menu.entity';
import { RestaurantKeyword } from './restaurant-keyword.entity';

@Entity('menu_eval')
export class MenuEval {
  @PrimaryGeneratedColumn({ name: 'menu_eval_id', type: 'bigint' })
  menuEvalId: number;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToOne(() => RestaurantKeyword)
  @JoinColumn({ name: 'keyword_id' })
  keyword: RestaurantKeyword;
}
