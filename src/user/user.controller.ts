import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get/all')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get(':id')
  async getUserInfo(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: id }, { posts: true });
  }

  @Post('/signup')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
