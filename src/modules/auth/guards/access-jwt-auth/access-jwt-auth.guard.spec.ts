import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { AccessJwtAuthGuard } from './access-jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: AccessJwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessJwtAuthGuard,
        {
          provide: Reflector,
          useValue: {},
        },
      ],
    }).compile();

    guard = module.get<AccessJwtAuthGuard>(AccessJwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
