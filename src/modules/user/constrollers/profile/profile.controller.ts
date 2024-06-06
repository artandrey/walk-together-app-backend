import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
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

  @Post()
  public async setProfile(
    @Req() req: Request,
    @Body() body: SetUserProfileDto,
  ) {
    const userId = req.user.id;
    const profile = await this._profileService.getProfile(userId);
    const changed = this._profileMapper.toDomain(body);
    const result = await this._profileService.setProfile(
      userId,
      this._profileMapper.joinChanges(profile, changed),
    );

    return this._profileMapper.toDto(result);
  }
}
