import { Injectable } from '@nestjs/common';
import { PartnershipModel } from '../models/partnership.model';
import { UserProfileMapper } from './user-profile.mapper';
import { RetrievePartnershipRecordDto } from '../dto/retrieve-partnership-record-dto';
import { RecordMapper } from 'src/modules/records/mappers/records.mapper';

@Injectable()
export class PartnershipMapper {
  constructor(
    private readonly userProfileMapper: UserProfileMapper,
    private readonly recordMapper: RecordMapper,
  ) {}

  toDto(partnership: PartnershipModel): RetrievePartnershipRecordDto {
    return {
      id: partnership.id,
      initiator: this.userProfileMapper.toDto(partnership.initiator),
      receiver: this.userProfileMapper.toDto(partnership.invited),
      accepted: partnership.isAccepted,
      createdAt: partnership.createdAt.toISOString(),
      records: this.recordMapper.combinedToDto(partnership.healthRecords),
    };
  }
}
