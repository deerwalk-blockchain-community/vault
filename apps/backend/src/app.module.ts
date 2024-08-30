import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { KycModule } from './kyc/kyc.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'images') }),
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: join(__dirname, '..', 'images'),
    }),
    AuthModule,
    CoreModule,
    KycModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
