import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { tokenSecretKey } from './config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: tokenSecretKey,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
