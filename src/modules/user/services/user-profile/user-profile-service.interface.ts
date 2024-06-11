import { UserProfileModel } from '../../models/user-profile.model';
import { IRecordsOptions } from '../../repository/profile/profile-repository.interface';

export interface IUserProfileService {
  getProfile(
    userId: string,
    includeRecords?: IRecordsOptions,
  ): Promise<UserProfileModel>;
  setProfile(
    userId: string,
    updated: Partial<UserProfileModel>,
  ): Promise<UserProfileModel>;
  searchProfile(nickname: string, code: number): Promise<UserProfileModel>;
}
