import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import {
  TodoQueryDto,
  CreateTodoRequestDto,
  UpdateTodoRequestDto,
  UpdateTodoSingleBodyDto,
} from './dto/todo.dto';
import { BulkDeleteRequestDto } from '../common/dto/bulk-delete.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {
  ApiTodoTags,
  ApiGetTodos,
  ApiCreateTodo,
  ApiPatchTodos,
  ApiDeleteTodos,
  ApiGetTodoById,
  ApiPatchTodoById,
  ApiDeleteTodoById,
} from './todo.swagger';

@ApiTodoTags()
@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiGetTodos()
  findAll(@CurrentUser('id') userId: number, @Query() query: TodoQueryDto) {
    return this.todoService.findAll(userId, query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateTodo()
  create(
    @CurrentUser('id') userId: number,
    @Body() body: CreateTodoRequestDto | CreateTodoRequestDto[],
  ) {
    return this.todoService.create(userId, body);
  }

  @Patch()
  @ApiPatchTodos()
  patchBulk(
    @CurrentUser('id') userId: number,
    @Body() body: UpdateTodoRequestDto | UpdateTodoRequestDto[],
  ) {
    return this.todoService.patchBulk(userId, body);
  }

  @Delete()
  @ApiDeleteTodos()
  deleteBulk(
    @CurrentUser('id') userId: number,
    @Body() body: BulkDeleteRequestDto,
  ) {
    return this.todoService.deleteBulk(userId, body.ids);
  }

  @Get(':id')
  @ApiGetTodoById()
  findOne(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todoService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiPatchTodoById()
  patchOne(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTodoSingleBodyDto,
  ) {
    return this.todoService.patchOne(userId, id, body);
  }

  @Delete(':id')
  @ApiDeleteTodoById()
  deleteOne(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todoService.deleteOne(userId, id);
  }
}
