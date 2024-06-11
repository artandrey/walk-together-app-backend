import { Injectable } from '@nestjs/common';
import { UserProfileModel } from '../models/user-profile.model';
import { plainToInstance } from 'class-transformer';
import { RetrieveUserProfileDto } from '../dto/retrieve-user-profile.dto';
import { SetUserProfileDto } from '../dto/set-user-profile.dto';
import { RecordMapper } from 'src/modules/records/mappers/records.mapper';

@Injectable()
export class UserProfileMapper {
  constructor(private readonly recordMapper: RecordMapper) {}

  toDto(userProfile: UserProfileModel) {
    return plainToInstance(RetrieveUserProfileDto, {
      userId: userProfile.userId,
      code: userProfile.code,
      nickname: userProfile.nickname,
      profilePicturePath: userProfile.profilePicturePath,
      records: userProfile.records
        ? this.recordMapper.combinedToDto(userProfile.records)
        : undefined,
    } satisfies RetrieveUserProfileDto);
  }
  toDomain(updateDto: SetUserProfileDto) {
    return plainToInstance(UserProfileModel, updateDto);
  }
  joinChanges(current: UserProfileModel, updated: Partial<UserProfileModel>) {
    return plainToInstance(UserProfileModel, {
      ...current,
      nickname: updated.nickname ?? current.nickname,
      profilePicturePath:
        updated.profilePicturePath ?? current.profilePicturePath,
    });
  }
}
