import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeormConfig } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`, // .env.development, .env.production
    }),
    // TypeOrmModule 안에 imports와 inject를 사용하여 ConfigModule, ConfigService를 추가합니다.
    // 그리고 useFactory로 설정을 반환한다. useFactory는 동적으로 모듈을 만들 때 사용됩니다.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TypeormConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
