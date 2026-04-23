import { Test, TestingModule } from '@nestjs/testing';
import { QuickAccessController } from './quick-access.controller';
import { QuickAccessService } from './quick-access.service';

describe('QuickAccessController', () => {
  let controller: QuickAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuickAccessController],
      providers: [QuickAccessService],
    }).compile();

    controller = module.get<QuickAccessController>(QuickAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
