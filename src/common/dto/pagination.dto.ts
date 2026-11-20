import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ example: 1, description: 'Page number (1-based)' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ example: 25, description: 'Total number of items' })
  totalItems: number;

  @ApiProperty({ example: 3, description: 'Total number of pages' })
  totalPages: number;

  @ApiProperty({ example: true, description: 'Whether next page exists' })
  hasNext: boolean;

  @ApiProperty({ example: false, description: 'Whether previous page exists' })
  hasPrev: boolean;
}

export class ErrorResponseDto {
  @ApiProperty({
    example: 'Error message description',
    description: 'Error message',
  })
  error: string;
}
