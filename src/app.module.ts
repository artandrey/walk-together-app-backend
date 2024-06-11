import { Module } from '@nestjs/common';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExceptionsModule } from './modules/exceptions/exceptions.module';
import { UserModule } from './modules/user/user.module';
import { RecordsModule } from './modules/records/records.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    DrizzlePostgresModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        schema,
        db: {
          connection: 'client',
          config: {
            connectionString: configService.get('SUPABASE_POSTGRES_URL'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
