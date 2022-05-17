import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ShippingsModule } from './shippings/shippings.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoriesModule, ProductsModule, ShippingsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
