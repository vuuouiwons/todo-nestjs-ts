import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todolist } from './entities/todolist.entity';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todolist])],
  controllers: [TodolistController],
  providers: [TodolistService],
  exports: [TodolistService, TypeOrmModule],
})
export class TodolistModule {}
