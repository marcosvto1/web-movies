import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
}
