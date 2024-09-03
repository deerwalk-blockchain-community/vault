import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { KycModule } from './kyc/kyc.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { UPLOAD_PATH } from './core/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads', limits: { fileSize: 10e6 } }),
    ServeStaticModule.forRoot({
      rootPath: UPLOAD_PATH,
      serveRoot: '/v1/uploads',
    }),
    AuthModule,
    CoreModule,
    KycModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
