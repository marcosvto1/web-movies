import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { ProductOrder } from 'src/orders/entities/product-order.entity';

export class CreateOrderDto extends OmitType(Order, [
  'id',
  'customer_id',
  'date',
]) {
  @IsNotEmpty()
  products: ProductOrder[];
}
