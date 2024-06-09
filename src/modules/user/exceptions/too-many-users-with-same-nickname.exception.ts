import { ClientException } from 'src/modules/exceptions/domain/client-exception/client.exception';

export class TooManyUsersWithSameNicknameException extends ClientException {
  public static readonly CODE = 'TOO_MANY_USERS_WITH_NICKNAME';
  constructor() {
    super(
      TooManyUsersWithSameNicknameException.CODE,
      'Too many users with this nickname',
    );
  }
}
