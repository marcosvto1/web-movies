import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findCategories() {
    return this.categoriesService.findAllCategories();
  }
}
