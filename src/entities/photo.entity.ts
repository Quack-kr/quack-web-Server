import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn({ name: 'photo_id', type: 'bigint' })
  photoId: number;

  @Column({ name: 'image_url', type: 'varchar', length: 500 })
  imageUrl: string;

  @Column({ name: 'target_type', type: 'varchar', length: 50 })
  targetType: string;

  @Column({ name: 'target_id', type: 'bigint' })
  targetId: number;

  @Column({ name: 'photo_type', type: 'varchar', length: 50 })
  photoType: string;

  @Column({ name: 'sort_order', type: 'int' })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
