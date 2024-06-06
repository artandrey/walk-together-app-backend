import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

@Injectable()
export class Supabase {
  private clientInstance: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  getClient(): SupabaseClient<Database> {
    if (this.clientInstance) {
      return this.clientInstance;
    }

    this.clientInstance = this.getClientInstance();

    return this.clientInstance;
  }
  getScopedClient() {
    return this.getClientInstance();
  }

  private getClientInstance() {
    return createClient<Database>(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
          flowType: 'pkce',
        },
      },
    );
  }
}
