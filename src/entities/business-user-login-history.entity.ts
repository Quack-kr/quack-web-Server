/**
 * 로그성 테이블
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('business_user_login_histories')
export class BusinessUserLoginHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurantOwnerId: number; // 그냥 숫자로만 저장 (외래키 X)

  @Column({ type: 'varchar', length: 45 })
  ipAddress: string;

  @Column({ type: 'text', nullable: true })
  userAgent: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
