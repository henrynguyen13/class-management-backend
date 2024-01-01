import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { IUpdateUser } from './users.interface';
import { IGetListResponse } from 'src/common/common.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(
    private userService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async getAllUsers(
    @Query() query: ExpressQuery,
  ): Promise<IGetListResponse<User>> {
    return this.userService.findAll(query);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: IUpdateUser,
  ): Promise<User> {
    return this.userService.updatedById(id, user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteById(id);
  }

  // @Get('/profile/:id')
  // async getMyProfile(@Req() req: Request, @Param('id') id: string) {
  //   return this.userService.getMyProfile(req);
  // }

  @Post('/:id/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async uploadAvatar(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const res = await this.cloudinaryService.uploadImageToCloudinary(
      file,
      'avatar',
    );
    return this.userService.updateAvatar(userId, res.secure_url);
  }
}
