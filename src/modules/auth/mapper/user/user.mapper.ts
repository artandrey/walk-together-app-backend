import { Injectable } from '@nestjs/common';
import { IUser, IUserPayload } from '../../models/auth-domain.models';

@Injectable()
export class UserMapper {
  public domainToPayload(user: IUser): IUserPayload {
    return {
      sid: user.id,
      email: user.email,
    };
  }
}
