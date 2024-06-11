import { Inject, Injectable } from '@nestjs/common';
import { IPartnershipRecordRepository } from './partnership-repository.interface';
import {
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

  findByUserId(userId: string) {
    return this.db.query.partnershipRecord.findMany({
      where: or(
        eq(partnershipRecord.initiatorUserId, userId),
        eq(partnershipRecord.invitedUserId, userId),
      ),
      with: {
        initiator: true,
        invited: true,
      },
    });
  }
  async countAcceptedPartnerships(userId: string): Promise<number> {
    const result = await this.db
      .select({ count: count(partnershipRecord.id) })
      .from(partnershipRecord)
      .where(
        and(
          or(
            eq(partnershipRecord.initiatorUserId, userId),
            eq(partnershipRecord.invitedUserId, userId),
          ),
          eq(partnershipRecord.isAccepted, true),
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

  async create(entity: INewPartnershipRecord) {
    const [result] = await this.db
      .insert(partnershipRecord)
      .values(entity)
      .returning();
    return await this.findById(result.id);
  }

  findById(id: number) {
    return this.db.query.partnershipRecord.findFirst({
      where: eq(partnershipRecord.id, id),
      with: {
        initiator: true,
        invited: true,
      },
    });
  }

  async update(id: number, updatedEntity: Partial<INewPartnershipRecord>) {
    await this.db
      .update(partnershipRecord)
      .set(updatedEntity)
      .where(eq(partnershipRecord.id, id));

    return await this.findById(id);
  }
  async delete(id: number): Promise<void> {
    await this.db.delete(partnershipRecord).where(eq(partnershipRecord.id, id));
  }
}
