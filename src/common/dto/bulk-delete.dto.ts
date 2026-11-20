import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, Min, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class BulkDeleteRequestDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Array of item IDs to delete',
    type: [Number],
    minimum: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  ids: number[];
}
