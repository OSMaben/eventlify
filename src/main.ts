import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ErrorHandler} from "./Middlewares/error-handler.middleware";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new ErrorHandler().use);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
