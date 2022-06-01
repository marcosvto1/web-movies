import { forwardRef, Module } from '@nestjs/common';
import { PagSeguroService } from './pagseguro.service';
import { PagseguroController } from './pagseguro.controller';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [forwardRef(() => OrdersModule)],
  providers: [PagSeguroService],
  exports: [PagSeguroService],
  controllers: [PagseguroController],
})
export class PagseguroModule {}
