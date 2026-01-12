import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.providers';
import { LoggerMiddleware } from './middlewares/logging/logger.middlware';
import { RequestInterceptor } from './interceptors/request/request.interceptor';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { UserModule } from './modules/resources/user/user.module';
import { AuthModule } from './modules/resources/auth/auth.module';
import { TodolistModule } from './modules/resources/todolist/todolist.module';
import { TodoModule } from './modules/resources/todo/todo.module';
import { ExpressMetricsMiddleware } from './modules/prometheus/express/express.service';

@Module({
  imports: [
    TodolistModule,
    TodoModule,
    DatabaseModule,
    UserModule,
    AuthModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, ExpressMetricsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
