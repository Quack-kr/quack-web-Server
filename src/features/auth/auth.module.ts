import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessUser } from '../../entities/business-user.entity';
import { BusinessUserLoginHistory } from '../../entities/business-user-login-history.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessUser, BusinessUserLoginHistory]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    ConfigModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
