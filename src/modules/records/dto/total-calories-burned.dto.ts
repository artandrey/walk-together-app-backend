export class TotalCaloriesBurnedDto {
  constructor(
    public id: string,
    public userId: string,
    public totalCaloriesBurned: number,
    public startTime: string,
    public endTime: string,
  ) {}
}
