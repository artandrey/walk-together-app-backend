import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile/profile.controller';
import {
  PARTNERSHIP_REPOSITORY,
  PARTNERSHIP_SERVICE,
  PROFILE_REPOSITORY,
  PROFILE_SERVICE,
} from './constants';
import { UserProfileService } from './services/user-profile/user-profile.service';
import { UserProfileMapper } from './mapper/user-profile.mapper';
import { SupabaseModule } from '../supabase/supabase.module';
import { DrizzleProfileRepository } from './repository/profile/drizzle-profile.repository';
import { PartnershipController } from './controllers/partnership/partnership.controller';
import { PartnershipService } from './services/partner-service/partnership.service';
import { DrizzlePartnershipRepository } from './repository/partnership/drizzle-partnership.repository';
import { PartnershipMapper } from './mapper/partnership.mapper';
import { RecordsModule } from '../records/records.module';

@Module({
  imports: [SupabaseModule, RecordsModule],
  controllers: [ProfileController, PartnershipController],
  providers: [
    { provide: PROFILE_SERVICE, useClass: UserProfileService },
    {
      provide: PROFILE_REPOSITORY,
      useClass: DrizzleProfileRepository,
    },
    { provide: PARTNERSHIP_SERVICE, useClass: PartnershipService },
    { provide: PARTNERSHIP_REPOSITORY, useClass: DrizzlePartnershipRepository },
    UserProfileMapper,
    PartnershipMapper,
  ],
})
export class UserModule {}
