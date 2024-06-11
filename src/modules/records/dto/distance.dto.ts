export class DistanceDto {
  constructor(
    public id: string,
    public userId: string,
    public distance: number,
    public startTime: string,
    public endTime: string,
  ) {}
}
