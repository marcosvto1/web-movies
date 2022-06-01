import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(customerId: number, createOrderDto: CreateOrderDto) {
    return this.prismaService.order.create({
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
      data: {
        ...createOrderDto,
        date: new Date(),
        customer: {
          connect: {
            id: customerId,
          },
        },
        products: {
          createMany: {
            data: createOrderDto.products,
          },
        },
      },
    });
  }

  public updateOrderStatus({ orderId, status }) {
    return this.prismaService.order.update({
      where: {
        id: +orderId,
      },
      data: {
        status,
      },
    });
  }
}
