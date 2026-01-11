import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepo } from './repository/todo.repo';
import { DatabaseModule } from 'src/common/database/database.providers';
import { TodolistRepo } from '../todolist/repository/todolist.repo';
import { TodolistService } from '../todolist/todolist.service';
import { SecurityModule } from 'src/libs/security/security.module';
import { UserRepo } from '../user/repository/user.repo';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [TodoController],
  providers: [TodoService, TodoRepo, TodolistRepo, TodolistService, UserRepo],
})
export class TodoModule { }
