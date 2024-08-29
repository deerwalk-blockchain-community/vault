import { Body, Controller, HttpException, Post, Version } from '@nestjs/common';
import { RegisterRequest } from './entities/request/registerRequest';
import { TokenResponse } from './entities/response/tokenResponse';
import { prisma } from 'src/core/db/prisma';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    authService = new AuthService()
    
    @Version('1')
    @Post('register')
    async register(@Body() request: RegisterRequest): Promise<TokenResponse> {

    const loginResult = await this.authService.registerUser(
        request.email,
        request.password,
        prisma
    )
    if (loginResult.err){
        loginResult.val
        throw new HttpException(
            loginResult.val.message,
            loginResult.val.statusCode
        )
    }

    console.log(loginResult.val.id)

    // jwt stuff!

    return {
        access_token:"let's goo if this works, pls work!"
    }

  }
}
