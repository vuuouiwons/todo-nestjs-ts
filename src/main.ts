import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.setGlobalPrefix('api', {
    exclude: [
      '/',
      'admin/queues',
      'health',
      'metrics'
    ]
  })

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Todolist Backend')
    .setDescription('Todolist backend api for quick poc')
    .setVersion('1.0')
    .build();

  const configService = app.get(ConfigService);

  const options: SwaggerCustomOptions = {
    ui: configService.get('ENVIRONMENT', 'production') !== 'production',
    raw: configService.get('ENVIRONMENT', 'production') !== 'production',
  }

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, options);

  await app.listen(configService.get("PORT", 3000));
}
bootstrap();
