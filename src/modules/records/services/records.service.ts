import { Injectable, Inject } from '@nestjs/common';
import {
  TOTAL_CALORIES_BURNED_REPOSITORY,
  DISTANCE_REPOSITORY,
  STEPS_REPOSITORY,
} from '../constants';
import {
  TotalCaloriesBurnedModel,
  DistanceModel,
  StepsModel,
  CombinedRecords,
} from '../models/records.models';
import {
  ITotalCaloriesBurnedRepository,
  IDistanceRepository,
  IStepsRepository,
} from '../repositories/records-repository.interface';

@Injectable()
export class RecordsService {
  constructor(
    @Inject(TOTAL_CALORIES_BURNED_REPOSITORY)
    private readonly totalCaloriesBurnedRepository: ITotalCaloriesBurnedRepository,
    @Inject(DISTANCE_REPOSITORY)
    private readonly distanceRepository: IDistanceRepository,
    @Inject(STEPS_REPOSITORY)
    private readonly stepsRepository: IStepsRepository,
  ) {}

  async readRecords(
    userId: string,
    from: Date,
    to: Date,
  ): Promise<CombinedRecords> {
    const steps = await this.getSteps(userId, from, to);
    const calories = await this.getTotalCaloriesBurned(userId, from, to);
    const distance = await this.getDistance(userId, from, to);
    return {
      steps,
      calories,
      distance,
    };
  }

  async getTotalCaloriesBurned(
    userId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<TotalCaloriesBurnedModel[]> {
    return this.totalCaloriesBurnedRepository.findByUserIdAndTimeRange(
      userId,
      startTime,
      endTime,
    );
  }

  async getDistance(
    userId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<DistanceModel[]> {
    return this.distanceRepository.findByUserIdAndTimeRange(
      userId,
      startTime,
      endTime,
    );
  }

  async getSteps(
    userId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<StepsModel[]> {
    return this.stepsRepository.findByUserIdAndTimeRange(
      userId,
      startTime,
      endTime,
    );
  }

  async saveTotalCaloriesBurned(
    data: TotalCaloriesBurnedModel,
  ): Promise<TotalCaloriesBurnedModel> {
    return this.totalCaloriesBurnedRepository.upsert(data);
  }

  async saveDistance(data: DistanceModel): Promise<DistanceModel> {
    return this.distanceRepository.upsert(data);
  }

  async saveSteps(data: StepsModel): Promise<StepsModel> {
    return this.stepsRepository.upsert(data);
  }

  async deleteTotalCaloriesBurned(id: string): Promise<void> {
    await this.totalCaloriesBurnedRepository.delete(id);
  }

  async deleteDistance(id: string): Promise<void> {
    await this.distanceRepository.delete(id);
  }

  async deleteSteps(id: string): Promise<void> {
    await this.stepsRepository.delete(id);
  }
}
