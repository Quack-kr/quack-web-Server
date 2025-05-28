import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  private readonly REDIRECT_URL: string;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const REDIRECT_URL = this.configService.get<string>('CLIENT_URL');
    if (!REDIRECT_URL) {
      throw new Error('CLIENT_URL is not defined');
    }

    this.REDIRECT_URL = REDIRECT_URL;
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  @HttpCode(301)
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    const email = req.user?.email;
    const privateId = req.user?.provider_id;
    const providerName = req.user?.provider_name;

    if (!email || !privateId || !providerName) {
      throw new Error('Invalid user information');
    }

    const { accessToken, refreshToken } = await this.authService.getJWT({
      provider_id: privateId,
      provider_name: providerName,
      email: email,
    });

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.cookie('isLoggedIn', true, { httpOnly: false });

    return res.redirect(this.REDIRECT_URL);
  }
}
