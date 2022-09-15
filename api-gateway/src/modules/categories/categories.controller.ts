import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Logger,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/intex';

@Controller('categories')
export class CategoriesController {
  private logger = new Logger(CategoriesController.name);
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query('categoryId') _id: string) {
    return await this.categoriesService.find(_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }

  @Patch(':_id')
  update(
    @Param('_id') _id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(_id, updateCategoryDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.categoriesService.remove(_id);
  }
}
