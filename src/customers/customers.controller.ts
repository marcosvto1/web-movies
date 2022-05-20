import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('register')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersService.findOneByEmail(
      createCustomerDto.email,
    );
    if (customer) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Duplicated email',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.customersService.create(createCustomerDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Request() request) {
    return request.user;
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  async orders(@Request() request) {
    const { orders } = await this.customersService.findCustomerOrders(
      request.user.id,
    );
    return orders;
  }
}
