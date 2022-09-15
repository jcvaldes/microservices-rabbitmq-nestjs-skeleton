import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxyFidelity } from 'src/proxyrmq/client-proxy';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private clientProxyFidelity: ClientProxyFidelity) {}

  private clientAdminBackend =
    this.clientProxyFidelity.getClientProxyAdminBackendInstance();

  create(createCategoryDto: CreateCategoryDto) {
    this.clientAdminBackend.emit('create-category', createCategoryDto);
  }

  async find(_id: string) {
    return await lastValueFrom(
      this.clientAdminBackend.send('findAll-categories', _id ? _id : ''),
    );
  }

  update(_id: string, updateCategoryDto: UpdateCategoryDto) {
    this.clientAdminBackend.emit('update-category', {
      id: _id,
      category: updateCategoryDto,
    });
  }

  remove(_id: string) {
    this.clientAdminBackend.emit('remove-category', {
      id: _id,
    });
  }
}
