import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ShippingsModule } from './shippings/shippings.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoriesModule, ProductsModule, ShippingsModule, CustomersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
