import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import * as entities from './entities';

const port = process.env.MYSQL_PORT as unknown as number;
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: port,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: Object.values(entities),
  synchronize: false,
  logging: true,
});
