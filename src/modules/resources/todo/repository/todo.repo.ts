import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, EntityManager } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { TodoI } from '../interfaces/todo.interface';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class TodoRepo {
    constructor(
        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) { }

    private getManager(manager?: EntityManager): Repository<Todo> {
        return manager ? manager.getRepository(Todo) : this.dataSource.getRepository(Todo);
    }

    async create(todoData: TodoI, manager?: EntityManager): Promise<Todo> {
        const repo = this.getManager(manager);

        const todo = repo.create(todoData);

        return await repo.save(todo);
    }

    async findOne(user: User, id: number, manager?: EntityManager): Promise<Todo | null> {
        const repo = this.getManager(manager);

        return await repo.findOne({
            where: {
                id,
                todolist: {
                    user: {
                        id: user.id
                    }
                }
            }
        })
    }

    async findAll(user: User, limit: number, offset: number, manager?: EntityManager): Promise<Todo[]> {
        const repo = this.getManager(manager);

        return await repo.find({
            where: {
                todolist: {
                    user: {
                        id: user.id
                    }
                }
            },
            order: {
                createdAt: 'DESC'
            },
            take: limit,
            skip: offset,
        })
    }

    async update(todo: Todo, newTodo: Partial<Todo>, manager?: EntityManager): Promise<Todo> {
        const repo = this.getManager(manager);

        const udpatedTodo = repo.merge(todo, newTodo)

        return await repo.save(udpatedTodo);
    }

    async delete(todo: Todo, manager?: EntityManager): Promise<void> {
        const repo = this.getManager(manager);

        await repo.remove(todo);

        return;
    }
}
