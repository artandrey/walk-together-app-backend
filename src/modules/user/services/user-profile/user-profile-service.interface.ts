import { UserProfileModel } from '../../models/user-profile.model';

export interface IUserProfileService {
  getProfile(userId: string);
  setProfile(userId: string, updated: UserProfileModel);
}
