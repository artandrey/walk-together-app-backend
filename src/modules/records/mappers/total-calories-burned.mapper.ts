import { Injectable } from '@nestjs/common';
import { TotalCaloriesBurnedDto } from '../dto/total-calories-burned.dto';
import { TotalCaloriesBurnedModel } from '../models/records.models';

@Injectable()
export class TotalCaloriesBurnedMapper {
  toDto(model: TotalCaloriesBurnedModel): TotalCaloriesBurnedDto {
    return new TotalCaloriesBurnedDto(
      model.id,
      model.userId,
      model.totalCaloriesBurned,
      model.startTime.toISOString(),
      model.endTime.toISOString(),
    );
  }

  toModel(dto: TotalCaloriesBurnedDto): TotalCaloriesBurnedModel {
    return new TotalCaloriesBurnedModel(
      dto.id,
      dto.userId,
      new Date(dto.startTime),
      new Date(dto.endTime),
      dto.totalCaloriesBurned,
    );
  }
}
