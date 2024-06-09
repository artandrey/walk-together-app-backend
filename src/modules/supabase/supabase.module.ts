import { Module } from '@nestjs/common';
import { Supabase } from './client/supabase';
import { SUPABASE_CLIENT } from './constants';

@Module({
  providers: [{ provide: SUPABASE_CLIENT, useClass: Supabase }],
  exports: [SUPABASE_CLIENT],
})
export class SupabaseModule {}
