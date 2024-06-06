import { Module } from '@nestjs/common';
import { Supabase } from './client/supabase';

@Module({
  providers: [Supabase],
  exports: [Supabase],
})
export class SupabaseModule {}
