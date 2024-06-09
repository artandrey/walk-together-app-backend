import { IBaseRepository } from 'src/modules/supabase/repository/base-repository/base-repository.interface';
import {
  ICreateProfile,
  IUpdateProfile,
  IUserProfile,
} from '../../entities/user-profiles.entity';

export interface IProfileRepository
  extends IBaseRepository<
    { create: ICreateProfile; entity: IUserProfile; update: IUpdateProfile },
    number
  > {
  getProfilesByNickname(nickname: string): Promise<IUserProfile[]>;
  findByUserId(userId: string): Promise<IUserProfile>;
  findByNicknameAndCode(nickname: string, code: number): Promise<IUserProfile>;
}
