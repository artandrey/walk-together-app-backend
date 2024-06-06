import { Injectable } from '@nestjs/common';
import { UserProfileModel } from '../models/user-profile.model';
import { plainToInstance } from 'class-transformer';
import { RetrieveUserProfileDto } from '../dto/retrieve-user-profile.dto';
import { SetUserProfileDto } from '../dto/set-user-profile.dto';

@Injectable()
export class UserProfileMapper {
  toDto(userProfile: UserProfileModel) {
    return plainToInstance(RetrieveUserProfileDto, userProfile);
  }
  toDomain(updateDto: SetUserProfileDto) {
    return plainToInstance(UserProfileModel, updateDto);
  }
  joinChanges(current: UserProfileModel, updated: UserProfileModel) {
    return plainToInstance(UserProfileModel, {
      ...current,
      nickname: updated.nickname ?? current.nickname,
      profilePicturePath:
        updated.profilePicturePath ?? current.profilePicturePath,
    });
  }
}
