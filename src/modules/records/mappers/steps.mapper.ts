import { Injectable } from '@nestjs/common';
import { StepsDto } from '../dto/steps.dto';
import { StepsModel } from '../models/records.models';

@Injectable()
export class StepsMapper {
  toDto(model: StepsModel): StepsDto {
    return new StepsDto(
      model.id,
      model.userId,
      model.count,
      model.startTime.toISOString(),
      model.endTime.toISOString(),
    );
  }

  toModel(dto: StepsDto): StepsModel {
    return new StepsModel(
      dto.id,
      dto.userId,
      new Date(dto.startTime),
      new Date(dto.endTime),
      dto.count,
    );
  }
}
