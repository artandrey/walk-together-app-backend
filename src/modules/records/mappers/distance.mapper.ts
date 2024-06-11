import { Injectable } from '@nestjs/common';
import { DistanceDto } from '../dto/distance.dto';
import { DistanceModel } from '../models/records.models';

@Injectable()
export class DistanceMapper {
  toDto(model: DistanceModel): DistanceDto {
    return new DistanceDto(
      model.id,
      model.userId,
      model.distance,
      model.startTime.toISOString(),
      model.endTime.toISOString(),
    );
  }

  toModel(dto: DistanceDto): DistanceModel {
    return new DistanceModel(
      dto.id,
      dto.userId,
      new Date(dto.startTime),
      new Date(dto.endTime),
      dto.distance,
    );
  }
}
