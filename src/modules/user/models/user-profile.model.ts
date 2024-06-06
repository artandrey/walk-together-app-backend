export class UserProfileModel {
  constructor(
    public id: number,
    public userId: string,
    public nickname: string,
    public code: number,
    public profilePicturePath: string,
  ) {}
}
