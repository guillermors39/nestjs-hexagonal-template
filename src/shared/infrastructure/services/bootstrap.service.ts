import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from '../interceptors/validation.exception.filter';

export const bootstrapFilterAndPipeline = (app: INestApplication) => {
  app.useGlobalFilters(new ValidationExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
};
