import { Injectable, Inject } from '@nestjs/common';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { TodolistRepo } from './repository/todolist.repo';
import { DataSource } from 'typeorm';
import { TodolistI } from './interfaces/todolist.interface';
import { User } from '../user/entities/user.entity';
import { Todolist } from './entities/todolist.entity';
import { ResponseTodolistDto } from './dto/response-todolist.dto';

@Injectable()
export class TodolistService {
  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    private readonly todolistRepo: TodolistRepo,
  ) {

  }
  async create(user: User, body: CreateTodolistDto): Promise<ResponseTodolistDto> {
    return await this.dataSource.transaction(async (manager) => {
      const todolistData: TodolistI = {
        title: body.title,
        status: false,
        user: user
      }

      const todolist = await this.todolistRepo.create(todolistData, manager);

      const parsedTodolsit = {
        id: todolist.id,
        title: todolist.title,
        status: todolist.status,
      }

      return parsedTodolsit;
    });
  }

  async findAll(user: User): Promise<ResponseTodolistDto[]> {
    return await this.dataSource.transaction(async (manager) => {
      const todolists = await this.todolistRepo.findAll(user, manager);

      const parsedTodolists = todolists.map((todolist) => {
        return {
          id: todolist.id,
          status: todolist.status,
          title: todolist.title,
        }
      });

      return await parsedTodolists;
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todolist`;
  }

  update(id: number, updateTodolistDto: UpdateTodolistDto) {
    return `This action updates a #${id} todolist`;
  }

  remove(id: number) {
    return `This action removes a #${id} todolist`;
  }
}
