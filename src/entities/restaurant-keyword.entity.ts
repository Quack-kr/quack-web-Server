import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type KeywordType = 'POSITIVE' | 'NEGATIVE';

@Entity('restaurant_keyword')
export class RestaurantKeyword {
  @PrimaryGeneratedColumn({ name: 'review_keyword_id', type: 'bigint' })
  reviewKeywordId: number;

  @Column({ name: 'review_tag', type: 'varchar', length: 100 })
  reviewTag: string;

  @Column({
    name: 'keyword_type',
    type: 'enum',
    enum: ['POSITIVE', 'NEGATIVE'],
  })
  keywordType: KeywordType;
}
