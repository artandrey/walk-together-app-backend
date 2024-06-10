import { Inject, Injectable } from '@nestjs/common';
import { IPartnershipRecordRepository } from './partnership-repository.interface';
import {
  IPartnershipRecord,
  INewPartnershipRecord,
  DBSchema,
} from 'src/modules/database/database-types';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { POSTGRES_DB } from 'src/modules/drizzle-postgres/constants';
import { and, count, eq, or } from 'drizzle-orm';
import { partnershipRecord } from 'src/modules/database/database-schema';

@Injectable()
export class DrizzlePartnershipRepository
  implements IPartnershipRecordRepository
{
  constructor(
    @Inject(POSTGRES_DB) private readonly db: NodePgDatabase<DBSchema>,
  ) {}

  findByUserId(userId: string): Promise<IPartnershipRecord[]> {
    return this.db.query.partnershipRecord.findMany({
      where: or(
        eq(partnershipRecord.initiatorUserId, userId),
        eq(partnershipRecord.invitedUserId, userId),
      ),
    });
  }
  async countAcceptedPartnerships(userId: string): Promise<number> {
    const result = await this.db
      .select({ count: count(partnershipRecord.id) })
      .from(partnershipRecord)
      .where(
        or(
          eq(partnershipRecord.initiatorUserId, userId),
          eq(partnershipRecord.invitedUserId, userId),
        ),
      );

    return result.at(0).count ?? 0;
  }
  async isPartner(userId1: string, userId2: string): Promise<boolean> {
    const result = await this.db.query.partnershipRecord.findFirst({
      where: and(
        or(
          eq(partnershipRecord.initiatorUserId, userId1),
          eq(partnershipRecord.initiatorUserId, userId2),
        ),
        or(
          eq(partnershipRecord.initiatorUserId, userId1),
          eq(partnershipRecord.initiatorUserId, userId2),
        ),
      ),
    });
    return !!result;
  }

  async create(entity: INewPartnershipRecord): Promise<IPartnershipRecord> {
    const [result] = await this.db
      .insert(partnershipRecord)
      .values(entity)
      .returning();
    return result;
  }

  findById(id: number): Promise<IPartnershipRecord> {
    return this.db.query.partnershipRecord.findFirst({
      where: eq(partnershipRecord.id, id),
    });
  }

  async update(
    id: number,
    updatedEntity: Partial<INewPartnershipRecord>,
  ): Promise<IPartnershipRecord> {
    const [result] = await this.db
      .update(partnershipRecord)
      .set(updatedEntity)
      .where(eq(partnershipRecord.id, id))
      .returning();
    return result;
  }
  async delete(id: number): Promise<void> {
    await this.db.delete(partnershipRecord).where(eq(partnershipRecord.id, id));
  }
}
