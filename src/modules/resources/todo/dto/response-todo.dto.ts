import { ApiProperty } from "@nestjs/swagger";

export class ResponseTodoDto {
    @ApiProperty({
        description: 'todo id'
    })
    id: number;

    @ApiProperty({
        description: 'todo message'
    })
    message: string;

    @ApiProperty({
        description: 'todo status'
    })
    status: boolean;

}