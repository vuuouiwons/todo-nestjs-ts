import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.setGlobalPrefix('api', {
    exclude: ['/', 'admin/queues', 'health', 'metrics'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Hono 3-Layer Todo API')
    .setDescription(
      '3-Layer RESTful API for Todo and Todolist management built with NestJS and Sequelize ORM.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token obtained from /api/v1/login',
      },
      'BearerAuth',
    )
    .build();

  const configService = app.get(ConfigService);

  const options: SwaggerCustomOptions = {
    ui: configService.get('ENVIRONMENT', 'production') !== 'production',
    raw: configService.get('ENVIRONMENT', 'production') !== 'production',
  };

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, options);

  await app.listen(configService.get('PORT', 3000));
}
void bootstrap();
