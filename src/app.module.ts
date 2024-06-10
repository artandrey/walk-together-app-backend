import { Module } from '@nestjs/common';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExceptionsModule } from './modules/exceptions/exceptions.module';
import { UserModule } from './modules/user/user.module';
import { RecordsModule } from './modules/records/records.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzlePostgresModule } from './modules/drizzle-postgres/drizzle-postgres.module';
import * as schema from './modules/database/database-schema';

@Module({
  imports: [
    SupabaseModule,
    AuthModule,
    ExceptionsModule,
    UserModule,
    RecordsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzlePostgresModule.forRoot({
      schema,
      db: {
        connection: 'client',
        config: {},
      },
    }),
  ],
  providers: [],
})
export class AppModule {}
