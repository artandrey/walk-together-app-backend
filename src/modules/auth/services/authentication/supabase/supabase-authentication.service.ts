import { Injectable } from '@nestjs/common';
import { IAuthenticationService } from '../authentication-service.interface';
import { SignInDto } from 'src/modules/auth/dto/sign-in/sign-in.dto';
import { AuthenticationFailedException } from 'src/modules/auth/exceptions/authentication-failed/authentication-failed.exception';
import { IUser } from 'src/modules/auth/models/auth-domain.models';
import { Supabase } from 'src/modules/supabase/client/supabase';

@Injectable()
export class SupabaseAuthenticationService implements IAuthenticationService {
  constructor(private readonly _supabase: Supabase) {}
  async validateUser(email: string, password: string): Promise<IUser> {
    const client = this._supabase.getScopedClient();
    const { data, error } = await client.auth.signUp({ email, password });

    if (error) return null;
    return {
      id: data.user.id,
      email: data.user.email,
    };
  }
  async registerUser(signInDto: SignInDto): Promise<IUser> {
    const client = this._supabase.getScopedClient();
    const { data, error } = await client.auth.signUp(signInDto);

    if (error) throw new AuthenticationFailedException(error.message);
    return {
      id: data.user.id,
      email: data.user.email,
    };
  }
}
