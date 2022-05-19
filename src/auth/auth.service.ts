import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const customerFound = await this.customersService.findOneByEmail(email);
    console.log(password, customerFound.password);
    if (
      customerFound &&
      this.customersService.comparePassword(password, customerFound.password)
    ) {
      const { password, ...customer } = customerFound;
      return customer;
    }
    return undefined;
  }

  async signIn(customer: any) {
    return this.jwtService.sign({
      email: customer.email,
      id: customer.id,
      name: customer.name,
    });
  }
}
