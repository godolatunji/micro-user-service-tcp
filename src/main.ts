import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { config } from './config';
import { adminSeed } from './seed-admin';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: config.port,
    },
  });

  await app.listen(() =>
    Logger.log(`micro user service started on port ${config.port}`),
  );

  adminSeed(app);
}
bootstrap();
