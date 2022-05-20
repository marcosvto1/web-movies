import { IsNotEmpty } from 'class-validator';

export class ProductOrder {
  id: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  quantity: number;
}
