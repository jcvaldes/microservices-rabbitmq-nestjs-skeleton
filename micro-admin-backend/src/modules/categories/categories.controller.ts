import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
const ackErrors: string[] = ['E11000'];
@Controller()
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);
  constructor(private readonly categoriesService: CategoriesService) {}

  @EventPattern('create-category')
  async createCategory(
    @Payload() category: Category,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    this.logger.log(`category: ${JSON.stringify(category)}`);
    try {
      await this.categoriesService.createCategory(category);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      // ackErrors.map(async ackError => {
      //   if (err.message.includes(ackError)) {
      //     await channel.ack(originalMsg)
      //   }
      // })
      const filterAckError = ackErrors.filter((ackError) =>
        err.message.includes(ackError),
      );
      if (filterAckError) {
        try {
          await channel.ack(originalMsg);
        } catch (err) {
          debugger;
        }
      }
    }
  }

  @MessagePattern('find-categories')
  async consultarCategorias(
    @Payload() _id: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      if (_id) {
        return await this.categoriesService.findCategoryById(_id);
      } else {
        return await this.categoriesService.findCategories();
      }
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('update-category')
  async updateCategory(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    this.logger.log(`category: ${JSON.stringify(data)}`);
    try {
      const _id: string = data.id;
      const category: Category = data.category;
      await this.categoriesService.updateCategory(_id, category);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      const filterAckError = ackErrors.filter((ackError) =>
        err.message.includes(ackError),
      );
      if (filterAckError) {
        await channel.ack(originalMsg);
      }
    }
  }
}
