import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BusinessUser, BusinessUserLoginHistory } from 'src/entities';
import bcrypt from 'bcryptjs';

// privateId: string, provider: string, email: string
interface UserIdToken {
  provider_id: string;
  provider_name: string;
  email: string;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(BusinessUser)
    private readonly businessUser: Repository<BusinessUser>,

    @InjectRepository(BusinessUserLoginHistory)
    private readonly businessUserLoginHistory: Repository<BusinessUserLoginHistory>,

    private readonly configService: ConfigService,

    private readonly jwtService: JwtService,
  ) {}

  public async getJWT(data: UserIdToken) {
    const user = await this.validateUserByProvider(data); // 카카오 정보 검증 및 회원가입 로직
    const accessToken = this.generateAccessToken(user); // AccessToken 생성
    const refreshToken = await this.generateRefreshToken(user); // refreshToken 생성
    return { accessToken, refreshToken };
  }

  private async generateRefreshToken(user: BusinessUser): Promise<string> {
    const payload = {
      userId: user.businessUserId,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });

    const saltOrRounds = 10;
    const currentRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    console.log('currentRefreshToken', currentRefreshToken);

    /**
     * TODO: Redis 에 저장하는 로직 추가
    await this.redisService.set(
      `refresh_token:${user.businessUserId}`,
      currentRefreshToken,
      'EX',
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    );
    */

    return refreshToken;
  }

  private generateAccessToken(user: BusinessUser): string {
    const payload = {
      userId: user.businessUserId,
    };
    return this.jwtService.sign(payload);
  }

  private async validateUserByProvider(
    data: UserIdToken,
  ): Promise<BusinessUser> {
    try {
      const user: BusinessUser = await this.businessUser.findOneByOrFail({
        providerId: data.provider_id,
        providerName: data.provider_name,
      });

      return user;
    } catch (error: unknown) {
      if (error instanceof EntityNotFoundError) {
        /**
         * TODO: 회원가입 비즈니스 로직은 따로 구현해야함
         * const user = this.businessUser.create({
         *   providerId: data.provider_id,
         *   providerName: data.provider_name,
         *   email: data.email,
         * });
         * await this.businessUser.save(user);
         * return user;
         */
      }

      throw new Error('Error occurred while validating user');
    }
  }

  /**
   * @Deprecated 소셜로그인만 허용하므로 password 방식은 지원하지 않음
  parseBasicToken(rawToken: string) {
    const basicTokenSplit: string[] = rawToken.split(' ');
    console.log(' basicTokenSplit ', basicTokenSplit);

    if (basicTokenSplit.length !== 2) {
      throw new BadRequestException({ message: 'invalid token format' });
    }

    const token = basicTokenSplit[1];

    console.log(' token ', token);
    //2) 추출한 토큰을 Base64 decoding  해서 이메일과 비밀번호를 나눈다.
    const decoded = Buffer.from(token, 'base64').toString('utf-8');

    console.log(' decoded ', decoded);

    /// "email:password"
    const tokenSplit = decoded.split(':');

    console.log(' tokenSplit ', tokenSplit);

    if (tokenSplit.length !== 2) {
      throw new BadRequestException('토큰 포멧이 잘못되었습니다.');
    }

    const [email, password] = tokenSplit;

    console.log(' email, password ', email, password);
    return { email, password };
  }

  async registerUser(rowToken: string) {
    const { email, password } = this.parseBasicToken(rowToken);

    const user = await this.businessUser.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException('이미 가입한 이메일 입니다.');
    }

    const hashRounds = this.configService.get<number>('HASH_ROUNDS') || 10;
    console.log('????hashRounds ', hashRounds);

    const hashedPassword = await bcrypt.hash(password, hashRounds);

    await this.businessUser.save({
      username: email,
      email,
      password: hashedPassword,
    });

    return this.businessUser.findOne({ where: { email } });
  }

  async authenticate(email: string, password: string) {
    const user = await this.businessUser.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new BadRequestException('잘못된 로그인 정보입니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('잘못된 로그인 정보입니다.');
    }

    return user;
  }

  async login(token: string) {
    const { email, password } = this.parseBasicToken(token);

    const user = await this.authenticate(email, password);

    const refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );
    const accessTokenSecret = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        role: user.role,
        type: 'refresh',
      },
      {
        secret: refreshTokenSecret,
        expiresIn: '14d',
      },
    );

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        role: user.role,
        type: 'access',
      },
      {
        secret: accessTokenSecret,
        expiresIn: 300,
      },
    );

    return {
      refresh_token: refreshToken,
      access_token: accessToken,
    };
  }
  */
}
