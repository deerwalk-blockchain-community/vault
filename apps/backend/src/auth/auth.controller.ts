import { Body, Controller, Post, Version } from '@nestjs/common';
import { RegisterRequest } from './entities/request/registerRequest';
import { TokenResponse } from './entities/response/tokenResponse';

@Controller('auth')
export class AuthController {
  @Version('1')
  @Post('register')
  async register(@Body() request: RegisterRequest): Promise<TokenResponse> {
    return {
      access_token: 'yoo, vamos! just login now, this is so cool!',
    };
  }
}
