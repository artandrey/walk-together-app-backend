import {
  DistanceModel,
  RecordBase,
  StepsModel,
  TotalCaloriesBurnedModel,
} from '../models/records.models';

export interface IRecordRepository<T extends RecordBase> {
  upsert(record: T): Promise<T>;
  delete(id: string): Promise<void>;
  findByUserIdAndTimeRange(
    userId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<T[]>;
}

export interface ITotalCaloriesBurnedRepository
  extends IRecordRepository<TotalCaloriesBurnedModel> {}

export interface IDistanceRepository extends IRecordRepository<DistanceModel> {}

export interface IStepsRepository extends IRecordRepository<StepsModel> {}
