import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { KycModule } from './kyc/kyc.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { UPLOAD_PATH } from './core/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: UPLOAD_PATH }),
    MulterModule.register({ dest: UPLOAD_PATH, limits: { fileSize: 10e6 } }),
    AuthModule,
    CoreModule,
    KycModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
