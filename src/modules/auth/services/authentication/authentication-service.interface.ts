import { SignUpDto } from '../../dto/sign-up/sign-up.dto';
import { IUser } from '../../models/auth-domain.models';

export interface IAuthenticationService {
  validateUser(email: string, password: string): Promise<IUser>;
  registerUser(signUpDto: SignUpDto): Promise<IUser>;
}
