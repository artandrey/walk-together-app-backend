import { UserProfileModel } from './user-profile.model';
import { CombinedRecords } from 'src/modules/records/models/records.models';

export class PartnershipModel {
  public id: number;
  public initiator: UserProfileModel;
  public invited: UserProfileModel;
  public isAccepted: boolean;
  public createdAt: Date;
  public healthRecords?: CombinedRecords;
}
