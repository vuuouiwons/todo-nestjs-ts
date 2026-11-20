import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  AuthRequestDto,
  LoginResponseDto,
  RegisterResponseDto,
} from './dto/auth.dto';
import { ErrorResponseDto } from '../common/dto/pagination.dto';

export const ApiAuthTags = () => ApiTags('Auth');

export const ApiRegister = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Register a new user',
      operationId: 'registerUser',
    }),
    ApiBody({ type: AuthRequestDto }),
    ApiResponse({
      status: 201,
      description: 'User registered successfully',
      type: RegisterResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input format or validation error',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 409,
      description: 'Email already exists',
      type: ErrorResponseDto,
    }),
  );

export const ApiLogin = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Authenticate user and receive JWT',
      operationId: 'loginUser',
    }),
    ApiBody({ type: AuthRequestDto }),
    ApiResponse({
      status: 200,
      description: 'Login successful',
      type: LoginResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input format or validation error',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Invalid credentials',
      type: ErrorResponseDto,
    }),
  );
