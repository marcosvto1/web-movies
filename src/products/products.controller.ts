import { Controller, Get, Param, Query } from '@nestjs/common';
import { query } from 'express';
import { FindAllProductDTO } from 'src/products/dto/find-all-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: FindAllProductDTO) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    const relatedProduct = await this.productsService.findAll({
      category_id: product.category_id,
      limit: 4,
    });
    return {
      ...product,
      related_products: relatedProduct,
    };
  }
}
