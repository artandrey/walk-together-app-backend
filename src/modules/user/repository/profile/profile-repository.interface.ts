import {
  INewUserProfile,
  IUserProfile,
} from 'src/modules/database/database-types';
import { IBaseRepository } from 'src/modules/shared/base-repository/base-repository.interface';

export interface IProfileRepository
  extends IBaseRepository<
    {
      create: INewUserProfile;
      entity: IUserProfile;
      update: Partial<INewUserProfile>;
    },
    number
  > {
  getProfilesByNickname(nickname: string): Promise<IUserProfile[]>;
  findByUserId(userId: string): Promise<IUserProfile>;
  findByNicknameAndCode(nickname: string, code: number): Promise<IUserProfile>;
}
