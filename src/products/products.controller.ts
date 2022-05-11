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
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}
