import { RecordsDto } from 'src/modules/records/dto/record.dto';

export class RetrieveUserProfileDto {
  public nickname: string;
  public code: number;
  public profilePicturePath: string;
  public userId: string;
  public records: RecordsDto;
}
