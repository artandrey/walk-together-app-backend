import { caloriesRecords } from 'src/modules/database/database-schema';
import { TotalCaloriesBurnedModel } from '../models/records.models';
import { ITotalCaloriesBurnedRepository } from './records-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { eq, and, between } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DBSchema } from 'src/modules/database/database-types';
import { POSTGRES_DB } from 'src/modules/drizzle-postgres/constants';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DrizzleTotalCaloriesBurnedRepository
  implements ITotalCaloriesBurnedRepository
{
  constructor(
    @Inject(POSTGRES_DB) private readonly db: NodePgDatabase<DBSchema>,
  ) {}

  async upsert(
    record: TotalCaloriesBurnedModel,
  ): Promise<TotalCaloriesBurnedModel> {
    const [result] = await this.db
      .insert(caloriesRecords)
      .values(record)
      .onConflictDoUpdate({ target: caloriesRecords.id, set: record })
      .returning();
    return plainToInstance(TotalCaloriesBurnedModel, result);
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(caloriesRecords).where(eq(caloriesRecords.id, id));
  }

  async findByUserIdAndTimeRange(
    userId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<TotalCaloriesBurnedModel[]> {
    const result = await this.db
      .select()
      .from(caloriesRecords)
      .where(
        and(
          eq(caloriesRecords.userId, userId),
          between(caloriesRecords.startTime, startTime, endTime),
          between(caloriesRecords.endTime, startTime, endTime),
        ),
      );

    return plainToInstance(TotalCaloriesBurnedModel, result);
  }
}
