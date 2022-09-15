import { Module } from '@nestjs/common';
import { ProxyRMQModule } from '../../proxyrmq/proxyrmq.module';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
