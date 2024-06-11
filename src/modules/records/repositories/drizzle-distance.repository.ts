import { Inject, Injectable } from '@nestjs/common';
import { eq, and, between } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { distanceRecords } from 'src/modules/database/database-schema';
import { DBSchema } from 'src/modules/database/database-types';
import { POSTGRES_DB } from 'src/modules/drizzle-postgres/constants';
import { DistanceModel } from '../models/records.models';
import { IDistanceRepository } from './records-repository.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DrizzleDistanceRepository implements IDistanceRepository {
  constructor(
    @Inject(POSTGRES_DB) private readonly db: NodePgDatabase<DBSchema>,
  ) {}

  async upsert(record: DistanceModel): Promise<DistanceModel> {
    const [result] = await this.db
      .insert(distanceRecords)
      .values(record)
      .onConflictDoUpdate({ target: distanceRecords.id, set: record })
      .returning();
    return plainToInstance(DistanceModel, result);
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(distanceRecords).where(eq(distanceRecords.id, id));
  }

  async findByUserIdAndTimeRange(
    userId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<DistanceModel[]> {
    const result = await this.db
      .select()
      .from(distanceRecords)
      .where(
        and(
          eq(distanceRecords.userId, userId),
          between(distanceRecords.startTime, startTime, endTime),
          between(distanceRecords.endTime, startTime, endTime),
        ),
      );

    return plainToInstance(DistanceModel, result);
  }
}
