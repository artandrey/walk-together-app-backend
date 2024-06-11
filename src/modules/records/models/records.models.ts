// models/record-base.model.ts
export abstract class RecordBase {
  constructor(
    public id: string,
    public userId: string,
    public startTime: Date,
    public endTime: Date,
  ) {}

  abstract getValue(): number;
}

// models/total-calories-burned.model.ts

export class TotalCaloriesBurnedModel extends RecordBase {
  constructor(
    id: string,
    userId: string,
    startTime: Date,
    endTime: Date,
    public totalCaloriesBurned: number,
  ) {
    super(id, userId, startTime, endTime);
  }

  getValue(): number {
    return this.totalCaloriesBurned;
  }
}

// models/distance.model.ts

export class DistanceModel extends RecordBase {
  constructor(
    id: string,
    userId: string,
    startTime: Date,
    endTime: Date,
    public distance: number,
  ) {
    super(id, userId, startTime, endTime);
  }

  getValue(): number {
    return this.distance;
  }
}

// models/steps.model.ts

export class StepsModel extends RecordBase {
  constructor(
    id: string,
    userId: string,
    startTime: Date,
    endTime: Date,
    public count: number,
  ) {
    super(id, userId, startTime, endTime);
  }

  getValue(): number {
    return this.count;
  }
}

export class CombinedRecords {
  constructor(
    public steps: StepsModel[],
    public calories: TotalCaloriesBurnedModel[],
    public distance: DistanceModel[],
  ) {}
}
