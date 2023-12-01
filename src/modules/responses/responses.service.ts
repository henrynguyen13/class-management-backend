import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateResponseDto } from './dtos/create-response.dto';
import { Response } from './schemas/response.schema';
@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name)
    private responseModel: mongoose.Model<Response>,
  ) {}

  async createResponse(dto: CreateResponseDto): Promise<Response> {
    return await this.responseModel.create(dto);
  }
}
