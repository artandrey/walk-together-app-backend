import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AUTHENTICATION_SERVICE } from '../../constants';
import { IAuthenticationService } from '../../services/authentication/authentication-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly _authService: IAuthenticationService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this._authService.validateUser(email, password);

    return user;
  }
}
