import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsInt,
  Min,
  IsOptional,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class CreateTodolistRequestDto {
  @ApiProperty({
    example: 'Work Tasks',
    description: 'Title of the todolist',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;
}

export class CreateTodolistBulkWrapperDto {
  @ApiProperty({
    type: [CreateTodolistRequestDto],
    description: 'Array of todolists to create',
  })
  items: CreateTodolistRequestDto[];
}

export class UpdateTodolistRequestDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the todolist to update',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({
    example: 'Work Tasks Updated',
    description: 'Updated title of the todolist',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;
}

export class TodolistResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Work Tasks' })
  title: string;

  @ApiProperty({ example: '2026-11-18T03:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-11-18T03:00:00.000Z' })
  updatedAt: string;
}

export class PaginatedTodolistResponseDto {
  @ApiProperty({ type: [TodolistResponseDto] })
  data: TodolistResponseDto[];

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}

export class TodolistQueryDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Page number (1-based)',
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of items per page',
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    example: 'Work',
    description: 'Filter by list title',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
