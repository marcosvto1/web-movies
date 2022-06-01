import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PagSeguroService } from 'src/pagseguro/pagseguro.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly pagSeguroService: PagSeguroService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() request,
    @Body() createOrderDto: CreateOrderDto,
    @Response() res,
  ) {
    const newOrder = await this.ordersService.create(
      request.user.id,
      createOrderDto,
    );

    try {
      const checkoutURL = await this.pagSeguroService.generateCheckoutURL(
        newOrder,
      );
      console.log(checkoutURL);
      return res.redirect(checkoutURL);
    } catch (error) {
      console.log(error);
    }
  }
}
