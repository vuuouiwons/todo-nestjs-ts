import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ResponseUserMeDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import {
  unauthorizedMessage,
  requestBodyMissingMessage
} from 'src/common/constants';

@ApiTags('User')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: unauthorizedMessage })
@ApiBadRequestResponse({ description: requestBodyMissingMessage })
@UseGuards(AuthGuard)
@UseInterceptors(IdentityInterceptor)
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  @ApiOperation({ summary: 'Retrieve the authenticated user profile' })
  @ApiOkResponse({
    description: 'User profile successfully retrieved.',
    type: ResponseUserMeDto,
  })
  async me(@Req() request): Promise<ResponseUserMeDto> {
    return this.userService.userMe(request.user);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user profile information' })
  @ApiOkResponse({
    description: 'User profile has been successfully updated.',
    type: ResponseUserMeDto,
  })
  async update(
    @Req() request,
    @Body() body: UpdateUserDto,
  ): Promise<ResponseUserMeDto> {
    return this.userService.updateUser(request.user, body);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete the user account' })
  @ApiNoContentResponse({
    description: 'User account has been successfully removed.'
  })
  @ApiBadRequestResponse({
    description: 'Confirmation username does not match.'
  })
  async delete(
    @Req() request,
    @Body() body: DeleteUserDto,
  ): Promise<void> {
    return this.userService.deleteUser(request.user, body);
  }
}