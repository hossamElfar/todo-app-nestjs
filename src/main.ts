import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as dotenv from 'dotenv';
import * as mailService from './shared/services/mail.service';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3001);
}
bootstrap();
