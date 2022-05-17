import { Test, TestingModule } from '@nestjs/testing';
import { ShippingsService } from './shippings.service';

describe('ShippingsService', () => {
  let service: ShippingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingsService],
    }).compile();

    service = module.get<ShippingsService>(ShippingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
