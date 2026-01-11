import { Injectable, Inject } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserI } from '../interfaces/user.interface';

@Injectable()
export class UserRepo {
    constructor(
        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) { }

    private getManager(manager?: EntityManager): Repository<User> {
        return manager ? manager.getRepository(User) : this.dataSource.getRepository(User);
    }

    async create(userData: UserI, manager?: EntityManager): Promise<User> {
        const repo = this.getManager(manager);

        const user = repo.create(userData);

        return await repo.save(user);
    }

    async findById(id: number, manager?: EntityManager): Promise<User | null> {
        const repo = this.getManager(manager);

        return await repo.findOneBy({
            id
        });
    }

    async findByEmail(email: string, manager?: EntityManager): Promise<User | null> {
        const repo = this.getManager(manager);

        return await repo.findOneBy({
            email
        });
    }

    async update(user: User, newUserPartial: Partial<User>, manager?: EntityManager) {
        const repo = this.getManager(manager);

        const updatedUser = repo.merge(user, newUserPartial);

        return repo.save(updatedUser);
    }
}
