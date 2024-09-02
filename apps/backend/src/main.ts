import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

require('dotenv').config();

async function bootstrap() {
  const PORT = 1337;
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('Vault API')
    .setDescription("Auth and User API's for Vault")
    .setVersion('1.0')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
