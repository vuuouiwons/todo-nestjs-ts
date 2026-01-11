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
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
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
} from '@nestjs/swagger';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto, GetTodolistsQueryDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { ResponseTodolistDto } from './dto/response-todolist.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import {
  UnprocessableEntityErrorMessage,
  requestBodyMissingMessage,
  unauthorizedMessage
} from 'src/common/constants';

@ApiTags('Todolist')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@UseInterceptors(IdentityInterceptor)
@ApiUnauthorizedResponse({ description: unauthorizedMessage })
@ApiUnprocessableEntityResponse({ description: UnprocessableEntityErrorMessage })
@Controller({
  path: 'todolist',
  version: '1',
})
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new todolist' })
  @ApiCreatedResponse({
    description: 'The todolist has been successfully created.',
    type: ResponseTodolistDto,
  })
  @ApiBadRequestResponse({ description: requestBodyMissingMessage })
  create(
    @Req() request,
    @Body() createTodolistDto: CreateTodolistDto,
  ): Promise<ResponseTodolistDto> {
    return this.todolistService.create(request.user, createTodolistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all todolists for the authenticated user' })
  @ApiOkResponse({
    description: 'Todolists successfully retrieved.',
    type: ResponseTodolistDto,
    isArray: true,
  })
  findAll(
    @Req() request,
    @Query() query: GetTodolistsQueryDto
  ): Promise<ResponseTodolistDto[]> {
    return this.todolistService.findAll(request.user, query.limit, query.offset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a todolist and its todos by ID' })
  @ApiOkResponse({
    description: 'Todolist successfully retrieved.',
    type: ResponseTodolistDto,
  })
  findOne(
    @Req() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseTodolistDto> {
    return this.todolistService.findOne(request.user, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing todolist' })
  @ApiOkResponse({
    description: 'The todolist has been successfully updated.',
    type: ResponseTodolistDto,
  })
  @ApiBadRequestResponse({ description: requestBodyMissingMessage })
  update(
    @Req() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodolistDto: UpdateTodolistDto,
  ): Promise<ResponseTodolistDto> {
    return this.todolistService.update(request.user, id, updateTodolistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a todolist' })
  @ApiNoContentResponse({
    description: 'The todolist has been successfully removed.',
  })
  remove(
    @Req() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.todolistService.remove(request.user, id);
  }
}