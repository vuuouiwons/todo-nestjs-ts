import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, IsInt, Min, Max } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({
        example: 1234,
        description: 'todolistId that is attached to this todo'
    })
    todolistId: number;

    @ApiProperty({
        example: 'i am todo message',
        description: "Message for a todo"
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(512, { message: "message too long" })
    message: string;

    @ApiProperty({
        example: false,
        description: 'todo status',
        required: false
    })
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    status: boolean;
}

export class GetTodosQueryDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    todolistId: number;

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
