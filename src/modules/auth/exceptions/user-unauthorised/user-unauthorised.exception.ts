import { AuthenticationException } from 'src/modules/exceptions/domain/authentication/authentication.exception';

export class UserUnauthorisedException extends AuthenticationException {
  private static readonly CODE = 'USRAUTH';

  constructor() {
    super(UserUnauthorisedException.CODE, 'User is unauthorised');
  }
}
