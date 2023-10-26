import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Common } from 'src/common/common.constants';
import { IUpdateUser } from './users.interface';
import { IGetListResponse } from 'src/common/common.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(query: Query): Promise<IGetListResponse<User>> {
    const perPage = Common.PERPAGE;
    const currentPage = Number(query.page) || Common.PAGE;
    const skip = perPage * (currentPage - 1);
    const keyword = query.keyword
      ? {
          username: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const totalUsers = await this.userModel.find({ ...keyword });
    const users = await this.userModel
      .find({ ...keyword })
      .select('-password')
      .limit(perPage)
      .skip(skip);
    return { items: users, totalItems: totalUsers.length };
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updatedById(id: string, user: IUpdateUser): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser)
      throw new HttpException('No user found', HttpStatus.BAD_REQUEST);
    return updatedUser;
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
