import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseAuthenticationService } from './supabase-authentication.service';

describe('SupabaseAuthenticationService', () => {
  let service: SupabaseAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupabaseAuthenticationService],
    }).compile();

    service = module.get<SupabaseAuthenticationService>(
      SupabaseAuthenticationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
