import { Module } from '@nestjs/common';
import { ProfileController } from './constrollers/profile/profile.controller';
import { PROFILE_REPOSITORY, PROFILE_SERVICE } from './constants';
import { UserProfileService } from './services/user-profile/user-profile.service';
import { SupabaseProfileRepository } from './repository/profile/supabase-profile.repository';
import { UserProfileMapper } from './mapper/user-profile.mapper';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ProfileController],
  providers: [
    { provide: PROFILE_SERVICE, useClass: UserProfileService },
    {
      provide: PROFILE_REPOSITORY,
      useClass: SupabaseProfileRepository,
    },
    UserProfileMapper,
  ],
})
export class UserModule {}
