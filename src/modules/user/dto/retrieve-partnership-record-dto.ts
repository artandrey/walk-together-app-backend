import { RecordsDto } from 'src/modules/records/dto/record.dto';
import { RetrieveUserProfileDto } from './retrieve-user-profile.dto';

export class RetrievePartnershipRecordDto {
  public id: number;
  public initiator: RetrieveUserProfileDto;
  public receiver: RetrieveUserProfileDto;
  public accepted: boolean;
  public createdAt: string;
  public records?: RecordsDto;
}
