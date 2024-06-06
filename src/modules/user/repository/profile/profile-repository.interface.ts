import { IBaseRepository } from 'src/modules/supabase/repository/base-repository/base-repository.interface';
import {
  ICreateProfile,
  IUpdateProfile,
} from '../../entities/user-profiles.entity';

export interface IProfileRepository
  extends IBaseRepository<
    { create: ICreateProfile; entity: IUpdateProfile; update: IUpdateProfile },
    number
  > {}
