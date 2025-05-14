import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('review_menu_summary')
export class ReviewMenuSummary {
  @PrimaryGeneratedColumn({ name: 'review_menu_summary_id', type: 'bigint' })
  reviewMenuSummaryId: number;

  @Column({ name: 'menu_id', type: 'bigint' })
  menuId: number;

  @Column({ name: 'history_date', type: 'date' })
  historyDate: string;

  @Column({ name: 'total_count', type: 'int' })
  totalCount: number;

  @Column({ name: 'rank', type: 'int' })
  rank: number;
}
