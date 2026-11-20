import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from '../../../src/todo/todo.controller';
import { TodoService } from '../../../src/todo/todo.service';
import { JwtService } from '@nestjs/jwt';

describe('TodoController', () => {
  let controller: TodoController;
  const mockTodoService = {
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
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
        {
          provide: JwtService,
          useValue: { verifyAsync: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
