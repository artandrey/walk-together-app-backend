import { Module } from '@nestjs/common';
import { ProfileController } from './constrollers/profile/profile.controller';

@Module({
  controllers: [ProfileController]
})
export class UserModule {}
