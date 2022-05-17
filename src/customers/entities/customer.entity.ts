import { IsEmail, IsNotEmpty } from 'class-validator';

export class Customer {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
