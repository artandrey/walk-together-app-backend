import { Module } from '@nestjs/common';
import { SupabaseAuthenticationService } from './services/authentication/supabase/supabase-authentication.service';
import { AUTHENTICATION_SERVICE } from './constants';
import { UserMapper } from './mapper/user/user.mapper';
import { APP_GUARD } from '@nestjs/core';
import { AccessJwtAuthGuard } from './guards/access-jwt-auth/access-jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule, JwtModule.register({}), PassportModule],
  providers: [
    UserMapper,
    LocalStrategy,
    JwtStrategy,
    {
      provide: AUTHENTICATION_SERVICE,
      useClass: SupabaseAuthenticationService,
    },
    {
      provide: APP_GUARD,
      useClass: AccessJwtAuthGuard,
    },
  ],
})
export class AuthModule {}
