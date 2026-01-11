import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Req,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto, GetTodosQueryDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseTodoDto } from './dto/response-todo.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { 
  UnprocessableEntityErrorMessage, 
  requestBodyMissingMessage, 
  unauthorizedMessage 
} from 'src/common/constants';

@ApiTags('Todo')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@UseInterceptors(IdentityInterceptor)
@ApiUnauthorizedResponse({ description: unauthorizedMessage })
@ApiBadRequestResponse({ description: requestBodyMissingMessage })
@ApiUnprocessableEntityResponse({ description: UnprocessableEntityErrorMessage })
@Controller({
  path: 'todo',
  version: '1',
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new todo item' })
  @ApiCreatedResponse({
    description: 'The todo item has been successfully created.',
    type: ResponseTodoDto,
  })
  @ApiNotFoundResponse({ description: 'The associated todolist was not found.' })
  create(
    @Req() request,
    @Body(new ValidationPipe()) createTodoDto: CreateTodoDto,
  ): Promise<ResponseTodoDto> {
    return this.todoService.create(request.user, createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve todo items for a specific todolist' })
  @ApiOkResponse({
    description: 'Todo items successfully retrieved.',
    type: ResponseTodoDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'The specified todolist was not found.' })
  findAll(
    @Req() request,
    @Query(new ValidationPipe()) query: GetTodosQueryDto,
  ): Promise<ResponseTodoDto[]> {
    return this.todoService.findAll(
      request.user,
      query.todolistId,
      query.limit,
      query.offset,
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing todo item' })
  @ApiOkResponse({ 
    description: 'The todo item has been successfully updated.',
    type: ResponseTodoDto 
  })
  @ApiNotFoundResponse({ description: 'The todo item or associated todolist was not found.' })
  update(
    @Req() request,
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe()) updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseTodoDto> {
    return this.todoService.update(request.user, id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a todo item' })
  @ApiNoContentResponse({
    description: 'The todo item has been successfully removed.',
  })
  @ApiNotFoundResponse({ description: 'The todo item was not found.' })
  remove(
    @Req() request,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    return this.todoService.remove(request.user, id);
  }
}