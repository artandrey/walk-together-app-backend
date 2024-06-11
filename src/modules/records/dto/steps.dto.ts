export class StepsDto {
  constructor(
    public id: string,
    public userId: string,
    public count: number,
    public startTime: string,
    public endTime: string,
  ) {}
}
