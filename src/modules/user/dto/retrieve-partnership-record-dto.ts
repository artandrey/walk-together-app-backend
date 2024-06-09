import { RetrieveUserProfileDto } from './retrieve-user-profile.dto';

export class RetrievePartnershipRecordDto {
  public initiator: RetrieveUserProfileDto;
  public receiver: RetrieveUserProfileDto;
  public accepted: boolean;
  public createdAt: string;
}
