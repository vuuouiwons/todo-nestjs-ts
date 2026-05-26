import { Test, TestingModule } from '@nestjs/testing';
import { Notification } from './notification';

describe('Notification', () => {
  let provider: Notification;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Notification],
    }).compile();

    provider = module.get<Notification>(Notification);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
