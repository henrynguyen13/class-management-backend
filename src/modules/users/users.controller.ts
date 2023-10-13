import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updatedById(id, user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteById(id);
  }
}
