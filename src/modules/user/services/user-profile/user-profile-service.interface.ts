import { UserProfileModel } from '../../models/user-profile.model';

export interface IUserProfileService {
  getProfile(userId: string): Promise<UserProfileModel>;
  setProfile(
    userId: string,
    updated: Partial<UserProfileModel>,
  ): Promise<UserProfileModel>;
  searchProfile(nickname: string, code: number): Promise<UserProfileModel>;
}
