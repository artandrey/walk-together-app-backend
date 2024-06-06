import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IUserPayload, IUser } from '../../models/auth-domain.models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(_configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.getOrThrow('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: true,
    });
  }

  validate(user: IUserPayload): IUser {
    return {
      id: user.sid,
      email: user.email,
    };
  }
}
