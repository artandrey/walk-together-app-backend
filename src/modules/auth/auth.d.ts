import { IUser } from './models/auth-domain.models';

declare module 'express' {
  interface Request {
    user: IUser;
  }
}
