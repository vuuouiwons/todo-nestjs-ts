import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsInt,
  Min,
  IsOptional,
  Max,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class CreateTodoRequestDto {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'Content of the todo item',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  message: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether the todo is checked / completed',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  check?: boolean = false;
}

export class UpdateTodoRequestDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the todo to update',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  id: number;

  @ApiPropertyOptional({
    example: 'Updated message',
    description: 'Updated message of the todo',
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  message?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Updated checked status',
  })
  @IsOptional()
  @IsBoolean()
  check?: boolean;
}

export class UpdateTodoSingleBodyDto {
  @ApiPropertyOptional({
    example: 'Updated message',
    description: 'Updated message of the todo',
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  message?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Updated checked status',
  })
  @IsOptional()
  @IsBoolean()
  check?: boolean;
}

export class TodoResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Buy groceries' })
  message: string;

  @ApiProperty({ example: false })
  check: boolean;

  @ApiProperty({ example: '2026-11-18T03:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-11-18T03:00:00.000Z' })
  updatedAt: string;
}

export class PaginatedTodoResponseDto {
  @ApiProperty({ type: [TodoResponseDto] })
  data: TodoResponseDto[];

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}

export class TodoQueryDto {
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
    example: 'groceries',
    description: 'Filter by message content',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Filter by completed check status',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  check?: boolean;
}
