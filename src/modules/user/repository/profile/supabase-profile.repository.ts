import { Supabase } from 'src/modules/supabase/client/supabase';
import { SupabaseBaseRepository } from 'src/modules/supabase/repository/supabase-base.repository';

export class SupabaseProfileRepository extends SupabaseBaseRepository<
  'user_profiles',
  'id'
> {
  constructor(supabase: Supabase) {
    super('user_profiles', 'id', supabase);
  }
}
