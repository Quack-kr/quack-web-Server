import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('restaurant')
export class Restaurant {
  @PrimaryGeneratedColumn({ name: 'restaurant_id', type: 'bigint' })
  restaurantId: number;

  @Column({ name: 'restaurant_name', type: 'varchar', length: 255 })
  restaurantName: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326 })
  @Index({ spatial: true })
  location: string;

  @Column({ name: 'area_id', type: 'bigint', nullable: true })
  areaId?: number;

  @Column({ name: 'category_id', type: 'bigint', nullable: true })
  categoryId?: number;
}
/** 

import { getRepository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

async function saveRestaurant() {
  const restaurantRepository = getRepository(Restaurant);
  const restaurant = new Restaurant();

  // 위도와 경도를 넣어서 POINT 데이터 생성
  restaurant.restaurantName = "My Restaurant";
  restaurant.address = "Some Address";
  restaurant.location = {
    type: 'Point',  // 'Point'로 설정
    coordinates: [127.024612, 37.532600]  // [경도, 위도] 형식
  };

  await restaurantRepository.save(restaurant);
}

import { getRepository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

async function findRestaurantsWithinRadius(latitude: number, longitude: number, radius: number) {
  const restaurantRepository = getRepository(Restaurant);

  // ST_Distance_Sphere 사용: (latitude, longitude)와 각 레스토랑의 위치 사이의 거리 계산
  const restaurants = await restaurantRepository
    .createQueryBuilder('restaurant')
    .where(
      `ST_Distance_Sphere(restaurant.location, ST_GeomFromText(:point, 4326)) <= :radius`,
      {
        point: `POINT(${longitude} ${latitude})`,  // 'POINT(경도 위도)'
        radius,  // 반경 (단위: 미터)
      }
    )
    .getMany();

  return restaurants;
}

import { getRepository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

async function findNearbyRestaurant(latitude: number, longitude: number) {
  const restaurantRepository = getRepository(Restaurant);

  const restaurant = await restaurantRepository
    .createQueryBuilder('restaurant')
    .orderBy(
      `ST_Distance_Sphere(restaurant.location, ST_GeomFromText(:point, 4326))`,
      'ASC'
    )
    .setParameter('point', `POINT(${longitude} ${latitude})`)
    .getOne();

  return restaurant;
}

import { getRepository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

async function findRestaurantsInArea(polygon: string) {
  const restaurantRepository = getRepository(Restaurant);

  const restaurants = await restaurantRepository
    .createQueryBuilder('restaurant')
    .where(
      `ST_Within(restaurant.location, ST_GeomFromText(:polygon, 4326))`,
      { polygon }
    )
    .getMany();

  return restaurants;
}
*/
