// src/configs/typeorm.config.ts
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function TypeormConfig(configService: ConfigService) {
  const env = configService.get('NODE_ENV') as 'production' | 'development';
  let isProd = false as boolean;
  if (env === 'production') {
    isProd = true;
  }

  if (!['development', 'production'].includes(env)) {
    throw Error('NODE_ENV must be development or production');
  }

  const synchronize =
    configService.get<string>('MYSQL_SYNCHRONIZE') === 'true' ? true : false;
  const logging =
    configService.get<string>('MYSQL_LOGGING') === 'true' ? true : false;

  const portNumber = configService.get<number>(`MYSQL_PORT`) as number;
  const option: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get(`MYSQL_HOST`),
    port: +portNumber,
    username: configService.get(`MYSQL_USERNAME`),
    password: configService.get(`MYSQL_PASSWORD`),
    database: configService.get(`MYSQL_DATABASE`),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    autoLoadEntities: true,
    synchronize: isProd ? false : synchronize,
    logging: logging,
    retryAttempts: isProd ? 10 : 1,
  };

  return option;
}
