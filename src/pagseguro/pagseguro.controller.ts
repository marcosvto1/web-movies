import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { PagSeguroService } from 'src/pagseguro/pagseguro.service';

@Controller('pagseguro')
export class PagseguroController {
  constructor(
    private readonly pagSeguroService: PagSeguroService,
    private readonly orderService: OrdersService,
  ) {}

  @Post('notification')
  async notification(@Body() body) {
    const { notificationCode } = body;
    const info = await this.pagSeguroService.fetchTransactionInfo(
      notificationCode,
    );
    await this.orderService.updateOrderStatus(info);
  }
}
