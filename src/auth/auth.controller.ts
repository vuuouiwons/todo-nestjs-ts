import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthRequestDto,
  LoginResponseDto,
  RegisterResponseDto,
} from './dto/auth.dto';
import { ApiAuthTags, ApiRegister, ApiLogin } from './auth.swagger';

@ApiAuthTags()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiRegister()
  register(@Body() authDto: AuthRequestDto): Promise<RegisterResponseDto> {
    return this.authService.register(authDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiLogin()
  login(@Body() authDto: AuthRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(authDto);
  }
}
