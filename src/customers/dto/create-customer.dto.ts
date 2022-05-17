import { OmitType } from '@nestjs/swagger';
import { Customer } from 'src/customers/entities/customer.entity';

export class CreateCustomerDto extends OmitType(Customer, ['id']) {}
