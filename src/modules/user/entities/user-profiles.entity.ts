import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from 'src/modules/supabase/database.types';

export interface IUserProfile extends Tables<'user_profiles'> {}
export interface ICreateProfile extends TablesInsert<'user_profiles'> {}
export interface IUpdateProfile extends TablesUpdate<'user_profiles'> {}
