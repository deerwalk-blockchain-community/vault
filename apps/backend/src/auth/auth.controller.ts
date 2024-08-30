import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Version,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegisterRequest } from './entities/request/registerRequest';
import { TokenResponse } from './entities/response/tokenResponse';
import { prisma } from 'src/core/db/prisma';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from './entities/request/loginRequest';
import { ValidateUserGuard } from './guards/validateUserGuard';
import { UserWithOutPassword } from 'src/core/entities/userEntity';
import { ValidateAdminGuard } from './guards/validateAdminGuard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Version('1')
  @Post('register')
  async register(@Body() request: RegisterRequest): Promise<TokenResponse> {
    const registerResult = await this.authService.registerUser(
      request.email,
      request.password,
      prisma,
    );
    if (registerResult.err) {
      throw new HttpException(
        registerResult.val.message,
        registerResult.val.statusCode,
      );
    }
    const token = await this.jwtService.signAsync({
      userId: registerResult.val.id,
    });

    return {
      access_token: token,
    };
  }

  @Version('1')
  @Post('login')
  async login(@Body() request: LoginRequest): Promise<TokenResponse> {
    const loginResult = await this.authService.loginUser(
      request.email,
      request.password,
      prisma,
    );

    if (loginResult.err) {
      throw new HttpException(
        loginResult.val.message,
        loginResult.val.statusCode,
      );
    }
    const token = await this.jwtService.signAsync({
      userId: loginResult.val.id,
    });

    return {
      access_token: token,
    };
  }

  @Version('1')
  @Get('me')
  @UseGuards(ValidateUserGuard)
  async me(@Request() req: Request) {
    const { user }: any = req;
    const realUser = user as UserWithOutPassword;
    return realUser;
  }

  @Version('1')
  @Get('isAdmin')
  @UseGuards(ValidateAdminGuard)
  async isAdmin(@Request() req: Request) {
    const { user }: any = req;
    const realUser = user as UserWithOutPassword;
    return realUser;
  }
}
