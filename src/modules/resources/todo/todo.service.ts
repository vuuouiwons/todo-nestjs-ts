import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseTodoDto } from './dto/response-todo.dto';
import { User } from '../user/entities/user.entity';
import { TodoI } from './interfaces/todo.interface';
import { TodoRepo } from './repository/todo.repo';
import { DataSource } from 'typeorm';
import { TodolistService } from '../todolist/todolist.service';
import { Todolist } from '../todolist/entities/todolist.entity';
import { TodolistRepo } from '../todolist/repository/todolist.repo';

@Injectable()
export class TodoService {
  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    private readonly todoRepo: TodoRepo,
    private readonly todolistRepo: TodolistRepo,
  ) { }

  async create(user: User, body: CreateTodoDto): Promise<ResponseTodoDto> {
    return this.dataSource.transaction(async (manager) => {
      const todolist = await this.todolistRepo.findOne(user, body.todolistId, manager);

      if (!todolist) throw new NotFoundException('todolist not found');

      const todoData: TodoI = {
        message: body.message,
        status: false,
        todolist: todolist,
      }

      const todo = await this.todoRepo.create(todoData, manager);

      const parsedTodo = {
        'id': todo.id,
        'message': todo.message,
        'status': todo.status
      }

      return parsedTodo;
    });
  }

  async findAll(user: User, todolistId: number, limit: number, offset: number): Promise<ResponseTodoDto[]> {
    return this.dataSource.transaction(async (manager) => {
      const todolist = this.todolistRepo.findOne(user, todolistId);

      if (!todolist) throw new NotFoundException('todolist not found');

      const todo = await this.todoRepo.findAll(user, limit, offset, manager);

      const parsedTodo = todo.map((d) => {
        return {
          id: d.id,
          message: d.message,
          status: d.status,
        }
      })

      return parsedTodo;
    });
  }

  async update(user: User, id: number, body: UpdateTodoDto): Promise<ResponseTodoDto> {
    return this.dataSource.transaction(async (manager) => {
      const todolist = await this.todolistRepo.findOne(user, body.todolistId, manager);

      if (!todolist) throw new NotFoundException('todolist not found');

      const todo = await this.todoRepo.findOne(user, id, manager);

      if (!todo) throw new NotFoundException('todo not found');

      let newTodoData = {
        status: body.status,
        message: body.message,
      }

      const newTodo = await this.todoRepo.update(todo, newTodoData);

      return {
        id: newTodo.id,
        message: newTodo.message,
        status: newTodo.status
      }
    });
  }

  async remove(user: User, id: number): Promise<void> {
    return this.dataSource.transaction(async (manager) => {
      const todo = await this.todoRepo.findOne(user, id, manager);
      if (!todo) throw new NotFoundException('todo not found');

      await this.todoRepo.delete(todo, manager);
    });
  }
}
