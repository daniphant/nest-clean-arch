import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from 'infrastructure/nest/filters/exceptions.filter';
import { AppModule } from './modules/app.module';

dotenv.config({ path: join(__dirname, '..', '..', '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Aplicando pipe de validação para a biblioteca class-validator funcionar corretamente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return errors.map((error) => ({
          ...error,
          isValidationError: true,
        }));
      },
    }),
  );

  // Habilitando o filter para pegar exceptions não tratadas
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
