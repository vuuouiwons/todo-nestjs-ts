import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Req, UnprocessableEntityException, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { ApiUnprocessableEntityResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UnprocessableEntityErrorMessage, requestBodyMissingMessage, unauthorizedMessage } from 'src/common/constants';
import { ResponseTodolistDto } from './dto/response-todolist.dto';
import { User } from '../user/entities/user.entity';

@UseGuards(AuthGuard)
@UseInterceptors(IdentityInterceptor)
@ApiBearerAuth('access-token')
@ApiUnprocessableEntityResponse({ description: UnprocessableEntityErrorMessage })
@ApiBadRequestResponse({ description: requestBodyMissingMessage })
@ApiUnauthorizedResponse({ description: unauthorizedMessage })
@Controller({
  path: 'todolist', version: '1'
})
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'todolist created',
    type: ResponseTodolistDto
  })
  create(
    @Req() request,
    @Body(new ValidationPipe()) createTodolistDto: CreateTodolistDto
  ): Promise<ResponseTodolistDto> {
    return this.todolistService.create(request.user, createTodolistDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'todolist retrived',
    type: ResponseTodolistDto,
    isArray: true
  })
  findAll(@Req() request): Promise<ResponseTodolistDto[]> {
    return this.todolistService.findAll(request.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todolistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodolistDto: UpdateTodolistDto) {
    return this.todolistService.update(request.user, +id, updateTodolistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Req() request,
    @Param('id', ParseIntPipe) id: number) {
    return this.todolistService.remove(request.user, id);
  }
}
