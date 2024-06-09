import { Inject } from '@nestjs/common';
import { UserProfileModel } from '../../models/user-profile.model';
import { IUserProfileService } from './user-profile-service.interface';
import { PROFILE_REPOSITORY } from '../../constants';
import { IProfileRepository } from '../../repository/profile/profile-repository.interface';
import { TooManyUsersWithSameNicknameException } from '../../exceptions/too-many-users-with-same-nickname.exception';
import { UserProfileMapper } from '../../mapper/user-profile.mapper';
import { UserProfileNotFoundException } from '../../exceptions/user-profile-not-found-exception';

export class UserProfileService implements IUserProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: IProfileRepository,
    private readonly profileMapper: UserProfileMapper,
  ) {}

  public async getProfile(userId: string): Promise<UserProfileModel> {
    const profilePersistance =
      await this.profileRepository.findByUserId(userId);
    return profilePersistance;
  }
  public async setProfile(
    userId: string,
    updated: Partial<UserProfileModel>,
  ): Promise<UserProfileModel> {
    const currentProfile = await this.getProfile(userId);

    if (!currentProfile) {
      const code = await this.generateNicknameCode(updated.nickname);

      return this.profileRepository.create({ ...updated, code: code, userId });
    }

    const isNicknameUpdated =
      updated.nickname && updated.nickname !== currentProfile.nickname;
    if (isNicknameUpdated) {
      updated.code = await this.generateNicknameCode(updated.nickname);
    }

    const updatedProfile = this.profileMapper.joinChanges(
      currentProfile,
      updated,
    );
    this.profileRepository.update(updatedProfile.id, updatedProfile);
    return updatedProfile;
  }

  private async generateNicknameCode(nickname: string) {
    const profilesByNickname =
      await this.profileRepository.getProfilesByNickname(nickname);
    if (profilesByNickname.length >= 9999) {
      throw new TooManyUsersWithSameNicknameException();
    }
    const profileCodes = new Set(
      profilesByNickname.map((profile) => profile.code),
    );
    return new Array(9999)
      .fill(0)
      .map((_, i) => i + 1)
      .find((code) => !profileCodes.has(code));
  }

  public async searchProfile(
    nickname: string,
    code: number,
  ): Promise<UserProfileModel> {
    const profile = await this.profileRepository.findByNicknameAndCode(
      nickname,
      code,
    );

    if (!profile) throw new UserProfileNotFoundException(nickname, code);
    return profile;
  }
}
