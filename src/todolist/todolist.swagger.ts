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
  CreateTodolistRequestDto,
  PaginatedTodolistResponseDto,
} from './dto/todolist.dto';
import { BulkDeleteRequestDto } from '../common/dto/bulk-delete.dto';
import { ErrorResponseDto } from '../common/dto/pagination.dto';

export const ApiTodolistTags = () =>
  applyDecorators(ApiTags('Todolist'), ApiBearerAuth('BearerAuth'));

export const ApiGetTodolists = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get paginated todolists (bulk)',
      operationId: 'getTodolists',
    }),
    ApiResponse({
      status: 200,
      description: 'Paginated list of todolists',
      type: PaginatedTodolistResponseDto,
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

export const ApiCreateTodolist = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Create todolist (single or bulk)',
      operationId: 'createTodolist',
    }),
    ApiBody({
      schema: {
        anyOf: [
          { $ref: '#/components/schemas/CreateTodolistRequest' },
          {
            type: 'array',
            items: { $ref: '#/components/schemas/CreateTodolistRequest' },
          },
          {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: '#/components/schemas/CreateTodolistRequest' },
              },
            },
          },
        ],
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Todolist(s) created successfully',
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

export const ApiPatchTodolists = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update todolists by ID (single or bulk)',
      operationId: 'patchTodolists',
    }),
    ApiBody({
      schema: {
        anyOf: [
          { $ref: '#/components/schemas/UpdateTodolistRequest' },
          {
            type: 'array',
            items: { $ref: '#/components/schemas/UpdateTodolistRequest' },
          },
        ],
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Todolist(s) updated successfully',
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

export const ApiDeleteTodolists = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete todolists in bulk by IDs',
      operationId: 'deleteTodolists',
    }),
    ApiBody({ type: BulkDeleteRequestDto }),
    ApiResponse({
      status: 200,
      description: 'Todolist(s) deleted successfully',
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

export const ApiGetTodolistById = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get single todolist by ID',
      operationId: 'getTodolistByID',
    }),
    ApiParam({ name: 'id', type: Number, example: 1 }),
    ApiResponse({
      status: 200,
      description: 'Todolist found',
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

export const ApiPatchTodolistById = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update single todolist by URL ID',
      operationId: 'patchTodolistByID',
    }),
    ApiParam({ name: 'id', type: Number, example: 1 }),
    ApiBody({ type: CreateTodolistRequestDto }),
    ApiResponse({
      status: 200,
      description: 'Todolist updated successfully',
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

export const ApiDeleteTodolistById = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete single todolist by URL ID',
      operationId: 'deleteTodolistByID',
    }),
    ApiParam({ name: 'id', type: Number, example: 1 }),
    ApiResponse({
      status: 200,
      description: 'Todolist deleted successfully',
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
