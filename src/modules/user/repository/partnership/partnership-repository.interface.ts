import { INewPartnershipRecord } from 'src/modules/database/database-types';
import { IBaseRepository } from 'src/modules/shared/base-repository/base-repository.interface';
import { PartnershipModel } from '../../models/partnership.model';

export interface IPartnershipRecordRepository
  extends IBaseRepository<
    {
      create: INewPartnershipRecord;
      entity: PartnershipModel;
      update: Partial<INewPartnershipRecord>;
    },
    number
  > {
  findByUserId(userId: string): Promise<PartnershipModel[]>;
  countAcceptedPartnerships(userId: string): Promise<number>;
  isPartner(userId1: string, userId2: string): Promise<boolean>;
}
