export class RecordDto {
  constructor(
    public userId: string,
    public value: number,
    public date: string,
  ) {}
}

export class RecordsDto {
  constructor(
    public steps: RecordDto[],
    public calories: RecordDto[],
    public distance: RecordDto[],
  ) {}
}
