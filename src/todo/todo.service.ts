import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, ILike, FindOptionsWhere } from 'typeorm';
import { Todo } from './entities/todo.entity';
import {
  TodoQueryDto,
  CreateTodoRequestDto,
  UpdateTodoRequestDto,
  UpdateTodoSingleBodyDto,
} from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(userId: number, query: TodoQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Todo> = { userId };
    if (query.search) {
      where.message = ILike(`%${query.search}%`);
    }
    if (typeof query.check === 'boolean') {
      where.check = query.check;
    }

    const [rows, count] = await this.todoRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    const totalPages = Math.ceil(count / limit) || (count === 0 ? 0 : 1);

    return {
      data: rows,
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async create(
    userId: number,
    body:
      | CreateTodoRequestDto
      | CreateTodoRequestDto[]
      | { items: CreateTodoRequestDto[] },
  ) {
    let items: CreateTodoRequestDto[];
    let isSingle = false;

    if (Array.isArray(body)) {
      items = body;
    } else if ('items' in body && Array.isArray(body.items)) {
      items = body.items;
    } else {
      items = [body as CreateTodoRequestDto];
      isSingle = true;
    }

    const entities = items.map((item) =>
      this.todoRepository.create({
        userId,
        message: item.message.trim(),
        check: item.check ?? false,
      }),
    );

    const saved = await this.todoRepository.save(entities);

    return {
      message: 'Todo(s) created successfully',
      data: isSingle ? saved[0] : saved,
    };
  }

  async patchBulk(
    userId: number,
    body: UpdateTodoRequestDto | UpdateTodoRequestDto[],
  ) {
    const isSingle = !Array.isArray(body);
    const items = Array.isArray(body) ? body : [body];

    const ids = items.map((i) => i.id);
    const existing = await this.todoRepository.find({
      where: { id: In(ids), userId },
    });

    if (existing.length !== ids.length) {
      throw new NotFoundException('Resource Not Found');
    }

    const existingMap = new Map(existing.map((e) => [e.id, e]));
    for (const item of items) {
      const record = existingMap.get(item.id)!;
      if (item.message !== undefined) {
        record.message = item.message.trim();
      }
      if (item.check !== undefined) {
        record.check = item.check;
      }
    }

    const updated = await this.todoRepository.save(existing);

    return {
      message: 'Todo(s) updated successfully',
      data: isSingle ? updated[0] : updated,
    };
  }

  async deleteBulk(userId: number, ids: number[]) {
    const result = await this.todoRepository.softDelete({
      id: In(ids),
      userId,
    });

    return {
      message: 'Items deleted successfully',
      deletedCount: result.affected ?? 0,
      requestedIDs: ids,
    };
  }

  async findOne(userId: number, id: number) {
    const item = await this.todoRepository.findOneBy({ id, userId });
    if (!item) {
      throw new NotFoundException('Resource Not Found');
    }
    return { data: item };
  }

  async patchOne(userId: number, id: number, dto: UpdateTodoSingleBodyDto) {
    const item = await this.todoRepository.findOneBy({ id, userId });
    if (!item) {
      throw new NotFoundException('Resource Not Found');
    }

    if (dto.message !== undefined) {
      item.message = dto.message.trim();
    }
    if (dto.check !== undefined) {
      item.check = dto.check;
    }
    const data = await this.todoRepository.save(item);

    return {
      message: 'Todo updated successfully',
      data,
    };
  }

  async deleteOne(userId: number, id: number) {
    const item = await this.todoRepository.findOneBy({ id, userId });
    if (!item) {
      throw new NotFoundException('Resource Not Found');
    }

    await this.todoRepository.softDelete({ id, userId });

    return {
      message: 'Item deleted successfully',
      id,
    };
  }
}
