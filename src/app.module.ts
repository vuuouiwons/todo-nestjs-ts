import { Module } from '@nestjs/common';
import { TodolistModule } from './modules/todolist/todolist.module';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    TodolistModule,
    TodoModule,
    UserModule,
    AuthModule,
    HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
