import { Test, TestingModule } from '@nestjs/testing';
import { ExpressMetricsMiddleware } from './express.service';

describe('ExpressMetricsMiddleware', () => {
  let service: ExpressMetricsMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpressMetricsMiddleware],
    }).compile();

    service = module.get<ExpressMetricsMiddleware>(ExpressMetricsMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
