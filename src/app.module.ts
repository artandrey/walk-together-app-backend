import { Module } from '@nestjs/common';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExceptionsModule } from './modules/exceptions/exceptions.module';
import { UserModule } from './modules/user/user.module';
import { RecordsModule } from './modules/records/records.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SupabaseModule,
    AuthModule,
    ExceptionsModule,
    UserModule,
    RecordsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [],
})
export class AppModule {}
