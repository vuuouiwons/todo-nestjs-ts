import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  UpdateTodoSingleBodyDto,
  PaginatedTodoResponseDto,
} from './dto/todo.dto';
import { BulkDeleteRequestDto } from '../common/dto/bulk-delete.dto';
import { ErrorResponseDto } from '../common/dto/pagination.dto';

export const ApiTodoTags = () =>
  applyDecorators(ApiTags('Todo'), ApiBearerAuth('BearerAuth'));

export const ApiGetTodos = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get paginated todos (bulk)',
      operationId: 'getTodos',
    }),
    ApiResponse({
      status: 200,
      description: 'Paginated list of todos',
      type: PaginatedTodoResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request / Validation Failure',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized / Missing or Invalid JWT Token',
      type: ErrorResponseDto,
    }),
  );

export const ApiCreateTodo = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Create todo (single or bulk)',
      operationId: 'createTodo',
    }),
    ApiBody({
      schema: {
        anyOf: [
          { $ref: '#/components/schemas/CreateTodoRequest' },
          {
            type: 'array',
            items: { $ref: '#/components/schemas/CreateTodoRequest' },
            minItems: 1,
          },
        ],
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Todo(s) created successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request / Validation Failure',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized / Missing or Invalid JWT Token',
      type: ErrorResponseDto,
    }),
  );

export const ApiPatchTodos = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update todos by ID (single or bulk)',
      operationId: 'patchTodos',
    }),
    ApiBody({
      schema: {
        anyOf: [
          { $ref: '#/components/schemas/UpdateTodoRequest' },
          {
            type: 'array',
            items: { $ref: '#/components/schemas/UpdateTodoRequest' },
            minItems: 1,
          },
        ],
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Todo(s) updated successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request / Validation Failure',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized / Missing or Invalid JWT Token',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Resource Not Found',
      type: ErrorResponseDto,
    }),
  );

export const ApiDeleteTodos = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete todos in bulk by IDs',
      operationId: 'deleteTodos',
    }),
    ApiBody({ type: BulkDeleteRequestDto }),
    ApiResponse({
      status: 200,
      description: 'Todo(s) deleted successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request / Validation Failure',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized / Missing or Invalid JWT Token',
      type: ErrorResponseDto,
    }),
  );

export const ApiGetTodoById = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get single todo by ID',
      operationId: 'getTodoByID',
    }),
    ApiParam({ name: 'id', type: Number, example: 1 }),
    ApiResponse({
      status: 200,
      description: 'Todo found',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request / Validation Failure',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized / Missing or Invalid JWT Token',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Resource Not Found',
      type: ErrorResponseDto,
    }),
  );

export const ApiPatchTodoById = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update single todo by URL ID',
      operationId: 'patchTodoByID',
    }),
    ApiParam({ name: 'id', type: Number, example: 1 }),
    ApiBody({ type: UpdateTodoSingleBodyDto }),
    ApiResponse({
      status: 200,
      description: 'Todo updated successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request / Validation Failure',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized / Missing or Invalid JWT Token',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Resource Not Found',
      type: ErrorResponseDto,
    }),
  );

export const ApiDeleteTodoById = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete single todo by URL ID',
      operationId: 'deleteTodoByID',
    }),
    ApiParam({ name: 'id', type: Number, example: 1 }),
    ApiResponse({
      status: 200,
      description: 'Todo deleted successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request / Validation Failure',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized / Missing or Invalid JWT Token',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Resource Not Found',
      type: ErrorResponseDto,
    }),
  );
