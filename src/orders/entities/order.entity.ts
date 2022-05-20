import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum OrderStatus {
  WaitingForPayment = 'WaitingForPayment',
  Paid = 'Paid',
}

export class Order {
  id: number;

  @IsDate()
  date: Date;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber()
  total: number;

  @IsNumber()
  shipping_price: number;

  @IsNotEmpty()
  shipping: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  complement: string;

  @IsNotEmpty()
  postal_code: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNumber()
  customer_id: number;
}

// model Order {
//   id Int @id @default(autoincrement())

//   date DateTime
//   status OrderStatus
//   total Int
//   shipping_price Int
//   shipping String
//   address String
//   number String
//   complement String
//   postal_code String
//   city String
//   state String

//   products OrderProduct[]

//   customer_id Int
//   customer Customer @relation(fields: [customer_id], references: [id])

//   @@map("order")
// }
