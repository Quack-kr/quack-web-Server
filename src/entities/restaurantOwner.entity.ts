import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { RestaurantOwnerSocialAccount } from './restaurantOwnerSocialAccount.entity';

@Entity('restaurant_owners')
@Unique(['email'])
export class RestaurantOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  email: string | null; // 소셜에서 이메일을 제공 안할 수도 있어서 nullable

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ type: 'varchar', nullable: false })
  profileImageUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ type: 'enum', default: 'GUEST', enum: ['GUEST', 'USER', 'OWNER'] })
  role: 'GUEST' | 'USER' | 'OWNER';

  @OneToMany(
    () => RestaurantOwnerSocialAccount,
    (social) => social.restaurantOwner,
  )
  socialAccounts: RestaurantOwnerSocialAccount[];
}
