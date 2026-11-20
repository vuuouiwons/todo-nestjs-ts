import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, ILike, FindOptionsWhere } from 'typeorm';
import { Todolist } from './entities/todolist.entity';
import {
  TodolistQueryDto,
  CreateTodolistRequestDto,
  UpdateTodolistRequestDto,
} from './dto/todolist.dto';

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(Todolist)
    private readonly todolistRepository: Repository<Todolist>,
  ) {}

  async findAll(userId: number, query: TodolistQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Todolist> = { userId };
    if (query.search) {
      where.title = ILike(`%${query.search}%`);
    }

    const [rows, count] = await this.todolistRepository.findAndCount({
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
      | CreateTodolistRequestDto
      | CreateTodolistRequestDto[]
      | { items: CreateTodolistRequestDto[] },
  ) {
    let items: CreateTodolistRequestDto[];
    let isSingle = false;

    if (Array.isArray(body)) {
      items = body;
    } else if ('items' in body && Array.isArray(body.items)) {
      items = body.items;
    } else {
      items = [body as CreateTodolistRequestDto];
      isSingle = true;
    }

    const entities = items.map((item) =>
      this.todolistRepository.create({
        userId,
        title: item.title.trim(),
      }),
    );

    const saved = await this.todolistRepository.save(entities);

    return {
      message: 'Todolist(s) created successfully',
      data: isSingle ? saved[0] : saved,
    };
  }

  async patchBulk(
    userId: number,
    body: UpdateTodolistRequestDto | UpdateTodolistRequestDto[],
  ) {
    const isSingle = !Array.isArray(body);
    const items = Array.isArray(body) ? body : [body];

    const ids = items.map((i) => i.id);
    const existing = await this.todolistRepository.find({
      where: { id: In(ids), userId },
    });

    if (existing.length !== ids.length) {
      throw new NotFoundException('Resource Not Found');
    }

    const existingMap = new Map(existing.map((e) => [e.id, e]));
    for (const item of items) {
      const record = existingMap.get(item.id)!;
      record.title = item.title.trim();
    }

    const updated = await this.todolistRepository.save(existing);

    return {
      message: 'Todolist(s) updated successfully',
      data: isSingle ? updated[0] : updated,
    };
  }

  async deleteBulk(userId: number, ids: number[]) {
    const result = await this.todolistRepository.softDelete({
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
    const item = await this.todolistRepository.findOneBy({ id, userId });
    if (!item) {
      throw new NotFoundException('Resource Not Found');
    }
    return { data: item };
  }

  async patchOne(userId: number, id: number, dto: CreateTodolistRequestDto) {
    const item = await this.todolistRepository.findOneBy({ id, userId });
    if (!item) {
      throw new NotFoundException('Resource Not Found');
    }

    item.title = dto.title.trim();
    const data = await this.todolistRepository.save(item);

    return {
      message: 'Todolist updated successfully',
      data,
    };
  }

  async deleteOne(userId: number, id: number) {
    const item = await this.todolistRepository.findOneBy({ id, userId });
    if (!item) {
      throw new NotFoundException('Resource Not Found');
    }

    await this.todolistRepository.softDelete({ id, userId });

    return {
      message: 'Item deleted successfully',
      id,
    };
  }
}
