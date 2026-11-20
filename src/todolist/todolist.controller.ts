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
import { TodolistService } from './todolist.service';
import {
  TodolistQueryDto,
  CreateTodolistRequestDto,
  UpdateTodolistRequestDto,
} from './dto/todolist.dto';
import { BulkDeleteRequestDto } from '../common/dto/bulk-delete.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {
  ApiTodolistTags,
  ApiGetTodolists,
  ApiCreateTodolist,
  ApiPatchTodolists,
  ApiDeleteTodolists,
  ApiGetTodolistById,
  ApiPatchTodolistById,
  ApiDeleteTodolistById,
} from './todolist.swagger';

@ApiTodolistTags()
@UseGuards(JwtAuthGuard)
@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Get()
  @ApiGetTodolists()
  findAll(@CurrentUser('id') userId: number, @Query() query: TodolistQueryDto) {
    return this.todolistService.findAll(userId, query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateTodolist()
  create(
    @CurrentUser('id') userId: number,
    @Body() body: CreateTodolistRequestDto | CreateTodolistRequestDto[],
  ) {
    return this.todolistService.create(userId, body);
  }

  @Patch()
  @ApiPatchTodolists()
  patchBulk(
    @CurrentUser('id') userId: number,
    @Body() body: UpdateTodolistRequestDto | UpdateTodolistRequestDto[],
  ) {
    return this.todolistService.patchBulk(userId, body);
  }

  @Delete()
  @ApiDeleteTodolists()
  deleteBulk(
    @CurrentUser('id') userId: number,
    @Body() body: BulkDeleteRequestDto,
  ) {
    return this.todolistService.deleteBulk(userId, body.ids);
  }

  @Get(':id')
  @ApiGetTodolistById()
  findOne(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todolistService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiPatchTodolistById()
  patchOne(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateTodolistRequestDto,
  ) {
    return this.todolistService.patchOne(userId, id, body);
  }

  @Delete(':id')
  @ApiDeleteTodolistById()
  deleteOne(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todolistService.deleteOne(userId, id);
  }
}
