require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConsoleLogger, VersioningType } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: false
    })
  });

  const config = new DocumentBuilder()
    .setTitle('Todolist API')
    .setDescription('Sample Backend for simple todolist api')
    .setVersion('1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const options = {
    autoTagControllers: true,
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey,
  };

  const documentFactory = () => SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
