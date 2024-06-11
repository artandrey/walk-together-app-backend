import {
  Body,
  Controller,
  Get,
  Inject,
  ParseIntPipe,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { IUserProfileService } from '../../services/user-profile/user-profile-service.interface';
import { Request } from 'express';
import { UserProfileMapper } from '../../mapper/user-profile.mapper';
import { SetUserProfileDto } from '../../dto/set-user-profile.dto';
import { PROFILE_SERVICE } from '../../constants';

@Controller('profiles')
export class ProfileController {
  constructor(
    @Inject(PROFILE_SERVICE)
    private readonly _profileService: IUserProfileService,
    private readonly _profileMapper: UserProfileMapper,
  ) {}

  @Get()
  public async getProfile(@Req() req: Request) {
    const userId = req.user.id;
    const result = await this._profileService.getProfile(userId);
    return this._profileMapper.toDto(result);
  }

  @Put()
  public async setProfile(
    @Req() req: Request,
    @Body() body: SetUserProfileDto,
  ) {
    const userId = req.user.id;
    const changed = this._profileMapper.toDomain(body);
    const result = await this._profileService.setProfile(userId, changed);

    return this._profileMapper.toDto(result);
  }

  @Get('/search')
  public async searchProfile(
    @Query('nickname') nickname: string,
    @Query('code', ParseIntPipe) code: number,
  ) {
    const profile = await this._profileService.searchProfile(nickname, code);
    return this._profileMapper.toDto(profile);
  }
}
