import { randomUUID } from 'crypto';

(global as any).crypto = {
  randomUUID,
};
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://myprofile-frontend.vercel.app/',
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
