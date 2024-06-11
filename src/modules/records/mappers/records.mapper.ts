import { Injectable } from '@nestjs/common';
import { CombinedRecords, RecordBase } from '../models/records.models';
import { RecordDto, RecordsDto } from '../dto/record.dto';

@Injectable()
export class RecordMapper {
  toDtoArray(models: RecordBase[]): RecordDto[] {
    const recordsMap = new Map<string, number>();
    models.forEach((model) => {
      const date = model.startTime.toLocaleDateString();
      const currentValue = recordsMap.get(date) || 0;
      recordsMap.set(date, currentValue + model.getValue());
    });
    return Array.from(recordsMap.entries()).map(
      ([date, value]) => new RecordDto(models[0].userId, value, date),
    );
  }

  toDto(model: RecordBase): RecordDto {
    const date = model.startTime.toLocaleDateString();
    return new RecordDto(model.userId, model.getValue(), date);
  }

  combinedToDto(model: CombinedRecords): RecordsDto {
    const { calories, distance, steps } = model;
    return new RecordsDto(
      this.toDtoArray(steps),
      this.toDtoArray(calories),
      this.toDtoArray(distance),
    );
  }
}
