import { Inject, Injectable } from '@nestjs/common';
import { StepsModel } from '../models/records.models';
import { IStepsRepository } from './records-repository.interface';
import { POSTGRES_DB } from 'src/modules/drizzle-postgres/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DBSchema } from 'src/modules/database/database-types';
import { stepsRecords } from 'src/modules/database/database-schema';
import { and, between, eq } from 'drizzle-orm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DrizzleStepsRepository implements IStepsRepository {
  constructor(
    @Inject(POSTGRES_DB) private readonly db: NodePgDatabase<DBSchema>,
  ) {}

  async upsert(record: StepsModel) {
    const [result] = await this.db
      .insert(stepsRecords)
      .values(record)
      .onConflictDoUpdate({ target: stepsRecords.id, set: record })
      .returning();
    return plainToInstance(StepsModel, result);
  }
  async delete(id: string): Promise<void> {
    await this.db.delete(stepsRecords).where(eq(stepsRecords.id, id));
  }
  async findByUserIdAndTimeRange(
    userId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<StepsModel[]> {
    const result = await this.db
      .select()
      .from(stepsRecords)
      .where(
        and(
          eq(stepsRecords.userId, userId),
          between(stepsRecords.startTime, startTime, endTime),
          between(stepsRecords.endTime, startTime, endTime),
        ),
      );

    return plainToInstance(StepsModel, result);
  }
}
