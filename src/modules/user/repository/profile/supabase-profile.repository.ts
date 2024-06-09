import { Supabase } from 'src/modules/supabase/client/supabase';
import { SupabaseBaseRepository } from 'src/modules/supabase/repository/supabase-base.repository';
import { IProfileRepository } from './profile-repository.interface';
import { IUserProfile } from '../../entities/user-profiles.entity';
import { Inject } from '@nestjs/common';
import { SUPABASE_CLIENT } from 'src/modules/supabase/constants';

export class SupabaseProfileRepository
  extends SupabaseBaseRepository<'user_profiles', 'id'>
  implements IProfileRepository
{
  constructor(@Inject(SUPABASE_CLIENT) supabase: Supabase) {
    super('user_profiles', 'id', supabase);
  }

  public async getProfilesByNickname(
    nickname: string,
  ): Promise<IUserProfile[]> {
    const result = await this._supabase
      .getClient()
      .from('user_profiles')
      .select()
      .eq('nickname', nickname);
    this.assertIsSuccess(result);
    return result.data;
  }

  public async findByUserId(userId: string): Promise<IUserProfile> {
    const result = await this._supabase
      .getClient()
      .from('user_profiles')
      .select()
      .eq('userId', userId)
      .limit(1);
    this.assertIsSuccess(result);
    return result.data.at(0);
  }

  public async findByNicknameAndCode(
    nickname: string,
    code: number,
  ): Promise<IUserProfile> {
    const result = await this._supabase
      .getClient()
      .from('user_profiles')
      .select()
      .eq('nickname', nickname)
      .eq('code', code)
      .limit(1);
    this.assertIsSuccess(result);
    return result.data.at(0);
  }
}
