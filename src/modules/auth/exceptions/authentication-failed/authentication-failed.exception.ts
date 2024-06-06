import { AuthenticationException } from 'src/modules/exceptions/domain/authentication/authentication.exception';

export class AuthenticationFailedException extends AuthenticationException {
  public static readonly CODE = 'AUTH';

  constructor(message: string) {
    super(AuthenticationFailedException.CODE, message);
  }
}
