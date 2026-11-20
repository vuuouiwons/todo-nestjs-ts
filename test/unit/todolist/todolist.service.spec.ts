import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodolistService } from '../../../src/todolist/todolist.service';
import { Todolist } from '../../../src/todolist/entities/todolist.entity';

describe('TodolistService', () => {
  let service: TodolistService;
  const mockTodolistRepository = {
    findAndCount: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodolistService,
        {
          provide: getRepositoryToken(Todolist),
          useValue: mockTodolistRepository,
        },
      ],
    }).compile();

    service = module.get<TodolistService>(TodolistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
