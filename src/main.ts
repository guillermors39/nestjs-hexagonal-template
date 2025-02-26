import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrapFilterAndPipeline } from '@shared/infrastructure/services/bootstrap.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  bootstrapFilterAndPipeline(app);

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
