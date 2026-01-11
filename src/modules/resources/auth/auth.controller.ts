import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/create-auth.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { ResponseSignInDto } from './dto/response-auth.dto';
import {
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { loginError, UnprocessableEntityErrorMessage } from 'src/common/constants';
import { requestBodyMissingMessage } from 'src/common/constants';

@ApiUnprocessableEntityResponse({ description: UnprocessableEntityErrorMessage })
@ApiBadRequestResponse({ description: requestBodyMissingMessage })
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({ description: 'User registered' })
  @ApiConflictResponse({ description: 'Email already registered' })
  async register(@Body() body: SignUpDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login success', type: ResponseSignInDto })
  @ApiBadRequestResponse({ description: loginError })
  async login(@Body() body: SignInDto): Promise<ResponseSignInDto> {
    return this.authService.signIn(body);
  }
}
