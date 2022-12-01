import { Test, TestingModule } from '@nestjs/testing';
import { PhysicianService } from './physician.service';

describe('PhysicianService', () => {
  let service: PhysicianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicianService],
    }).compile();

    service = module.get<PhysicianService>(PhysicianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
