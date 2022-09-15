import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCategoryDto } from './modules/categories/dto/create-category.dto';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);
  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:OeG41tSsgopd@34.229.7.205:5672/loyalty'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async crearCategoria(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.clientAdminBackend.emit(
      'create-category',
      createCategoryDto,
    );
  }
}
