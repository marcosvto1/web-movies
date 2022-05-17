import { Injectable } from '@nestjs/common';
import { filter } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { FindAllProductDTO } from 'src/products/dto/find-all-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filters: FindAllProductDTO) {
    const where = this.setFilters(filters);
    let take = undefined;

    if (filters.limit) {
      take = +filters.limit;
    }

    return this.prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
      where,
      take,
    });
  }

  findOne(id: number, includeCategory = true, includeImages = true) {
    return this.prisma.product.findFirst({
      where: { id },
      include: {
        category: includeCategory,
        images: includeImages,
      },
    });
  }

  private setFilters(filters: FindAllProductDTO) {
    const where: any = {};
    if (filters.is_featured) {
      where.is_featured = filters.is_featured === 'true' ? true : false;
    }

    if (filters.category_id) {
      where.category_id = +filters.category_id;
    }

    if (filters.q) {
      where.name = { contains: filters.q };
    }

    return where;
  }
}
