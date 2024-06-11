import { Module } from '@nestjs/common';
import {
  TOTAL_CALORIES_BURNED_REPOSITORY,
  DISTANCE_REPOSITORY,
  STEPS_REPOSITORY,
} from './constants';
import { RecordsController } from './controllers/records.controller';
import { DistanceMapper } from './mappers/distance.mapper';
import { StepsMapper } from './mappers/steps.mapper';
import { TotalCaloriesBurnedMapper } from './mappers/total-calories-burned.mapper';
import { RecordsService } from './services/records.service';
import { DrizzleDistanceRepository } from './repositories/drizzle-distance.repository';
import { DrizzleStepsRepository } from './repositories/drizzle-steps.repository';
import { DrizzleTotalCaloriesBurnedRepository } from './repositories/drizzle-total-calories-burned.repository';
import { RecordMapper } from './mappers/records.mapper';

@Module({
  controllers: [RecordsController],
  providers: [
    RecordsService,
    TotalCaloriesBurnedMapper,
    DistanceMapper,
    StepsMapper,
    RecordMapper,
    {
      provide: TOTAL_CALORIES_BURNED_REPOSITORY,
      useClass: DrizzleTotalCaloriesBurnedRepository,
    },
    {
      provide: DISTANCE_REPOSITORY,
      useClass: DrizzleDistanceRepository,
    },
    {
      provide: STEPS_REPOSITORY,
      useClass: DrizzleStepsRepository,
    },
  ],
  exports: [
    DistanceMapper,
    StepsMapper,
    TotalCaloriesBurnedMapper,
    RecordMapper,
  ],
})
export class RecordsModule {}
