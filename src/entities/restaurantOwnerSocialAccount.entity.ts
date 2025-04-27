import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  DeleteDateColumn,
} from 'typeorm';
import { RestaurantOwner } from './restaurantOwner.entity';

@Unique(['provider', 'providerId'])
@Entity('restaurant_owner_social_accounts')
export class RestaurantOwnerSocialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RestaurantOwner, (owner) => owner.socialAccounts, {
    nullable: false,
  })
  @JoinColumn({ name: 'restaurantOwnerId' })
  restaurantOwner: RestaurantOwner;

  @Column()
  restaurantOwnerId: number;

  @Column({ type: 'varchar', nullable: false })
  provider: string; // google, kakao, naver 등

  @Column({ type: 'varchar', nullable: false })
  providerId: string; // 소셜 고유 ID

  @CreateDateColumn()
  createdAt: Date;

  // 30일 후 삭제 실제 row 데이터를 delete
  @DeleteDateColumn()
  deletedAt: Date | null;
}
