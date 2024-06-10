import {
  INewPartnershipRecord,
  IPartnershipRecord,
} from 'src/modules/database/database-types';
import { IBaseRepository } from 'src/modules/shared/base-repository/base-repository.interface';

export interface IPartnershipRecordRepository
  extends IBaseRepository<
    {
      create: INewPartnershipRecord;
      entity: IPartnershipRecord;
      update: Partial<INewPartnershipRecord>;
    },
    number
  > {
  findByUserId(userId: string): Promise<IPartnershipRecord[]>;
  countAcceptedPartnerships(userId: string): Promise<number>;
  isPartner(userId1: string, userId2: string): Promise<boolean>;
}
