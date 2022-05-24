import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { UpdateCustomerDTO } from 'src/customers/dto/update-customer.dto';
import { UpdatePasswordDTO } from 'src/customers/dto/update-password.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.prismaService.customer.create({
      data: {
        ...createCustomerDto,
        password: this.preparePassword(createCustomerDto.password),
      },
    });
  }

  private preparePassword(plainText: string) {
    const salt = genSaltSync(10);
    return hashSync(plainText, salt);
  }

  comparePassword(plainText: string, hash: string) {
    return compareSync(plainText, hash);
  }

  findOneByEmail(email: string) {
    return this.prismaService.customer.findFirst({
      where: {
        email: email,
      },
    });
  }

  findCustomerOrders(customerId: number) {
    return this.prismaService.customer.findFirst({
      select: {
        orders: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        id: customerId,
      },
    });
  }

  findOneOrderByCustomer(customerId: number, orderId: number) {
    return this.prismaService.order.findFirst({
      where: {
        customer_id: customerId,
        id: orderId,
      },
      include: {
        products: {
          select: {
            product: true,
          },
        },
      },
    });
  }

  updateCustomer(customerId: number, updateCustomerDTO: UpdateCustomerDTO) {
    return this.prismaService.customer.update({
      where: {
        id: customerId,
      },
      data: updateCustomerDTO,
    });
  }

  updatePassword(customerId: number, updatePasswordDTO: UpdatePasswordDTO) {
    if (updatePasswordDTO.password !== updatePasswordDTO.confirmPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Incorrect password confirmation',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prismaService.customer.update({
      where: {
        id: customerId,
      },
      data: {
        password: this.preparePassword(updatePasswordDTO.password),
      },
    });
  }
}
