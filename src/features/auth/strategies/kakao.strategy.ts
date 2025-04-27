import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: 'YOUR_KAKAO_CLIENT_ID',
      clientSecret: 'YOUR_KAKAO_CLIENT_SECRET',
      callbackURL: 'YOUR_KAKAO_CALLBACK_URL',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any) => void): Promise<any> {
    const user = {
      id: profile.id,
      username: profile.username,
      // other profile information
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
