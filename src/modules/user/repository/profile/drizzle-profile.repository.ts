import { Inject, Injectable } from '@nestjs/common';
import {
  IProfileRepository,
  IRecordsOptions,
} from './profile-repository.interface';
import { POSTGRES_DB } from 'src/modules/drizzle-postgres/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DBSchema, INewUserProfile } from 'src/modules/database/database-types';
import { and, between, eq } from 'drizzle-orm';
import {
  caloriesRecords,
  distanceRecords,
  stepsRecords,
  userProfiles,
} from 'src/modules/database/database-schema';

@Injectable()
export class DrizzleProfileRepository implements IProfileRepository {
  constructor(
    @Inject(POSTGRES_DB) private readonly db: NodePgDatabase<DBSchema>,
  ) {}

  getProfilesByNickname(nickname: string) {
    return this.db.query.userProfiles.findMany({
      where: eq(userProfiles.nickname, nickname),
    });
  }
  findByUserId(userId: string, recordsOptions?: IRecordsOptions) {
    if (!recordsOptions) {
      return this.db.query.userProfiles.findFirst({
        where: eq(userProfiles.userId, userId),
      });
    }
    return this.db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, userId),
      with: {
        distanceRecords: {
          where: and(
            between(
              distanceRecords.startTime,
              recordsOptions.from,
              recordsOptions.to,
            ),
            between(
              distanceRecords.endTime,
              recordsOptions.from,
              recordsOptions.to,
            ),
          ),
        },
        stepsRecords: {
          where: and(
            between(
              stepsRecords.startTime,
              recordsOptions.from,
              recordsOptions.to,
            ),
            between(
              stepsRecords.endTime,
              recordsOptions.from,
              recordsOptions.to,
            ),
          ),
        },
        caloriesRecords: {
          where: and(
            between(
              caloriesRecords.startTime,
              recordsOptions.from,
              recordsOptions.to,
            ),
            between(
              caloriesRecords.endTime,
              recordsOptions.from,
              recordsOptions.to,
            ),
          ),
        },
      },
    });
  }
  findByNicknameAndCode(nickname: string, code: number) {
    return this.db.query.userProfiles.findFirst({
      where: and(
        eq(userProfiles.nickname, nickname),
        eq(userProfiles.code, code),
      ),
    });
  }
  async create(entity: INewUserProfile) {
    const [result] = await this.db
      .insert(userProfiles)
      .values(entity)
      .returning();
    return result;
  }
  findById(id: number) {
    return this.db.query.userProfiles.findFirst({
      where: eq(userProfiles.id, id),
    });
  }
  async update(id: number, updatedEntity: Partial<INewUserProfile>) {
    const [result] = await this.db
      .update(userProfiles)
      .set(updatedEntity)
      .where(eq(userProfiles.id, id))
      .returning();
    return result;
  }
  async delete(id: number): Promise<void> {
    await this.db.delete(userProfiles).where(eq(userProfiles.id, id));
  }
}
