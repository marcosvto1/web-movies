import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAllCategories(limit: number) {
    return this.prisma.category.findMany({ take: limit });
  }
}
