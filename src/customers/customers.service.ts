import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

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
}
