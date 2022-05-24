import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Request,
  Param,
  Patch,
} from '@nestjs/common';
import { userInfo } from 'os';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCustomerDTO } from 'src/customers/dto/update-customer.dto';
import { UpdatePasswordDTO } from 'src/customers/dto/update-password.dto';
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
    delete request.user.iat;
    return request.user;
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  async findOrders(@Request() request) {
    const { orders } = await this.customersService.findCustomerOrders(
      request.user.id,
    );
    return orders;
  }

  @Get('orders/:id')
  @UseGuards(JwtAuthGuard)
  async findOrderById(@Param('id') id, @Request() request) {
    return this.customersService.findOneOrderByCustomer(request.user.id, +id);
  }

  @Patch('update-profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() request,
    @Body() updateCustomerDTO: UpdateCustomerDTO,
  ) {
    const { password, ...customer } =
      await this.customersService.updateCustomer(
        request.user.id,
        updateCustomerDTO,
      );
    return customer;
  }

  @Patch('update-password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Request() request,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ) {
    const { password, ...customer } =
      await this.customersService.updatePassword(
        request.user.id,
        updatePasswordDTO,
      );
    return customer;
  }
}
