import { IsNotEmpty, IsString } from 'class-validator';

export class FindShippingDTO {
  @IsNotEmpty()
  products: string;

  @IsNotEmpty()
  zipcode: string;
}
