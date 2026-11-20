import { Test, TestingModule } from '@nestjs/testing';
import { TodolistController } from '../../../src/todolist/todolist.controller';
import { TodolistService } from '../../../src/todolist/todolist.service';
import { JwtService } from '@nestjs/jwt';

describe('TodolistController', () => {
  let controller: TodolistController;
  const mockTodolistService = {
    findAll: jest.fn(),
    create: jest.fn(),
    patchBulk: jest.fn(),
    deleteBulk: jest.fn(),
    findOne: jest.fn(),
    patchOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodolistController],
      providers: [
        {
          provide: TodolistService,
          useValue: mockTodolistService,
        },
        {
          provide: JwtService,
          useValue: { verifyAsync: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TodolistController>(TodolistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
