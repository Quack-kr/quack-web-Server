import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('restaurant_area')
export class RestaurantArea {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'area_name', type: 'varchar2', length: 100 })
  areaName: string;
}
