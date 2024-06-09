import { ClientException } from 'src/modules/exceptions/domain/client-exception/client.exception';

export class UserProfileNotFoundException extends ClientException {
  public static readonly CODE = 'USER_PROFILE_NOT_FOUND';

  constructor(nickname: string, code: number) {
    super(
      UserProfileNotFoundException.CODE,
      `User profile ${nickname}#${code.toString().padStart(4, '0')} was not found`,
    );
  }
}
