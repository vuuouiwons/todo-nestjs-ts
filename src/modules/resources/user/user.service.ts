import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { UserRepo } from './repository/user.repo';
import { User } from './entities/user.entity';
import { ResponseUserMeDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource } from 'typeorm';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) { }

  async userMe(user: User): Promise<ResponseUserMeDto> {
    return {
      username: user.username
    }
  }

  async updateUser(user: User, body: UpdateUserDto): Promise<ResponseUserMeDto> {
    return await this.dataSource.transaction(async (manager) => {
      const updatedUser = await this.userRepo.update(user, body);

      return await {
        username: updatedUser.username
      }
    });
  }

  async deleteUser(user: User, body: DeleteUserDto): Promise<void> {
    return await this.dataSource.transaction(async (manager) => {
      if (user.username !== body.username) {
        throw new BadRequestException('Confirmation username does not match');
      }

      await manager.delete(User, user.id);
    });
  }
}
