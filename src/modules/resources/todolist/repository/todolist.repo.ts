import { Injectable, Inject } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Todolist } from '../entities/todolist.entity';
import { TodolistI } from '../interfaces/todolist.interface';
import { User } from 'src/modules/resources/user/entities/user.entity';

@Injectable()
export class TodolistRepo {
    constructor(
        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) { }

    private getManager(manager?: EntityManager): Repository<Todolist> {
        return manager ? manager.getRepository(Todolist) : this.dataSource.getRepository(Todolist);
    }

    async create(todolist: TodolistI, manager?: EntityManager): Promise<Todolist> {
        const repo = this.getManager(manager);

        const newTodo = repo.create(todolist);

        return await repo.save(newTodo);
    }

    async findAll(user: User, limit: number, offset: number, manager?: EntityManager) {
        const repo = this.getManager(manager);

        return await repo.find({
            where: {
                user: {
                    id: user.id
                }
            },
            order: {
                updatedAt: 'ASC'
            },
            take: limit,
            skip: offset,
        })
    }

    async findOne(user: User, id: number, manager?: EntityManager) {
        const repo = this.getManager(manager);

        return await repo.findOneBy({
            user: {
                id: user.id
            },
            id
        })
    }

    async update(todolist: Todolist, newTodolistPartial: Partial<Todolist>, manager?: EntityManager) {
        const repo = this.getManager(manager);

        const updatedTodolist = await repo.merge(todolist, newTodolistPartial);

        return repo.save(updatedTodolist);
    }

    async delete(todolist: Todolist, manager?: EntityManager) {
        const repo = this.getManager(manager);

        await repo.remove(todolist);

        return null;
    };
}
