import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findCategories(@Query('limit') limit: number) {
    return this.categoriesService.findAllCategories(+limit || 10);
  }
}
