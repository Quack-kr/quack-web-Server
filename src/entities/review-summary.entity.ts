import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('review_summary')
export class ReviewSummary {
  @PrimaryGeneratedColumn({ name: 'review_summary_id', type: 'bigint' })
  reviewSummaryId: number;

  @Column({ name: 'restaurant_id', type: 'bigint' })
  restaurantId: number;

  @Column({ name: 'history_date', type: 'date' })
  historyDate: string;

  @Column({
    name: 'keyword_type',
    type: 'enum',
    enum: ['POSITIVE', 'NEGATIVE'],
  })
  keywordType: 'POSITIVE' | 'NEGATIVE';

  @Column({ name: 'review_summary_rank', type: 'int' })
  reviewSummaryRank: number;

  @Column({ name: 'total_count', type: 'int' })
  totalCount: number;

  @Column({ name: 'review_summary_tag', type: 'varchar', length: 255 })
  reviewSummaryTag: string;
}
