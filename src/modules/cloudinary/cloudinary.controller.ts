import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file')) // body -> form-data -> image
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    const res = await this.cloudinaryService.uploadImageToCloudinary(
      image,
      'test',
    );
    return res;
  }
}
