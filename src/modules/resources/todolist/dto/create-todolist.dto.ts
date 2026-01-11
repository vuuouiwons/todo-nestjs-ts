import { IsNotEmpty, IsOptional, IsString, IsBoolean, MaxLength, Max, Min, IsInt } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateTodolistDto {
    @ApiProperty({
        example: 'i am todolist title',
        description: 'Title for todolist'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255, { message: "title too long" }) // Fixed: changed from @Max to @MaxLength
    title: string;

    @ApiProperty({
        example: false, // Fixed: use actual boolean false, not string 'false'
        description: 'Todolist status',
        required: false
    })
    @IsOptional()
    @IsBoolean() // Added: ensures the value is a boolean
    @Transform(({ value }) => value === 'true' || value === true) // Optional: converts string "true"/"false" to boolean
    status?: boolean;
}

export class GetTodolistsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 20;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset: number = 0;
}