import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile as KakaoProfile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(configService: ConfigService) {
    const clientID = configService.get<string>('KAKAO_CLIENT_ID');
    const clientSecret = configService.get<string>('KAKAO_CLIENT_SECRET');
    const callbackURL = configService.get<string>('KAKAO_CALLBACK_URL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error(
        'KAKAO_CLIENT_ID or KAKAO_CLIENT_SECRET or KAKAO_CALLBACK_URL is not defined',
      );
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
    });
  }

  validate(accessToken: string, profile: KakaoProfile) {
    const id = profile.id;
    const json = profile._json as {
      kakao_account: {
        email: string;
      };
    };
    console.log('json', json);

    return {
      provider: 'kakao',
      provider_id: id,
      accessToken,
      email: json.kakao_account?.email,
    };
  }
}
