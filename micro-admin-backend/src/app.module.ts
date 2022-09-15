import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      // 'mongodb+srv://jcvaldes:swordfish@cluster0.kgn4b.mongodb.net/sradmbackend?retryWrites=true&w=majority',
      'mongodb://localhost:27017/dbadminbackend',
    ),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
