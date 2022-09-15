import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}
  async createCategory(category: Category): Promise<Category> {
    try {
      const categoryCreated = new this.categoryModel(category);
      return await categoryCreated.save();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }
  async findCategories(): Promise<Category[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }
  async findCategoryById(_id: string): Promise<Category> {
    try {
      return await this.categoryModel.findOne({ _id }).exec();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }
  async updateCategory(_id: string, category: Category): Promise<void> {
    try {
      await this.categoryModel
        .findOneAndUpdate({ _id }, { $set: category })
        .exec();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }
}
