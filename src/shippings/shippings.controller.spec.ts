import { Test, TestingModule } from '@nestjs/testing';
import { ShippingsController } from './shippings.controller';
import { ShippingsService } from './shippings.service';

describe('ShippingsController', () => {
  let controller: ShippingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingsController],
      providers: [ShippingsService],
    }).compile();

    controller = module.get<ShippingsController>(ShippingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
