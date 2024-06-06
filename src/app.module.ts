import { Module } from '@nestjs/common';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExceptionsModule } from './modules/exceptions/exceptions.module';

@Module({
  imports: [SupabaseModule, AuthModule, ExceptionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
