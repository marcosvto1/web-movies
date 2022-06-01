import { Test, TestingModule } from '@nestjs/testing';
import { PagseguroController } from './pagseguro.controller';

describe('PagseguroController', () => {
  let controller: PagseguroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagseguroController],
    }).compile();

    controller = module.get<PagseguroController>(PagseguroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
