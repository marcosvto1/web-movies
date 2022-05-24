import { PickType } from '@nestjs/swagger';
import { Customer } from 'src/customers/entities/customer.entity';

export class UpdateCustomerDTO extends PickType(Customer, ['name']) {}
