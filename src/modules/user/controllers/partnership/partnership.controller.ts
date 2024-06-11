import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  Inject,
  Query,
} from '@nestjs/common';

import { Request } from 'express';
import { RetrievePartnershipRecordDto } from '../../dto/retrieve-partnership-record-dto';
import { PartnershipService } from '../../services/partner-service/partnership.service';
import { PartnershipMapper } from '../../mapper/partnership.mapper';
import { PARTNERSHIP_SERVICE } from '../../constants';
import { UserProfileMapper } from '../../mapper/user-profile.mapper';

@Controller('partnerships')
export class PartnershipController {
  constructor(
    @Inject(PARTNERSHIP_SERVICE)
    private readonly partnershipService: PartnershipService,
    private readonly partnershipMapper: PartnershipMapper,
    private readonly userProfileMapper: UserProfileMapper,
  ) {}

  @Get()
  async getPartnerships(
    @Req() req: Request,
  ): Promise<RetrievePartnershipRecordDto[]> {
    const userId = req.user.id;
    const partnerships = await this.partnershipService.getPartnerships(userId);
    return partnerships.map((partnership) =>
      this.partnershipMapper.toDto(partnership),
    );
  }

  @Get('partners')
  async getPartnershipsRecords(
    @Req() req: Request,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    const userId = req.user.id;
    const partnerships = await this.partnershipService.getPartnersWithRecords(
      userId,
      new Date(startTime),
      new Date(endTime),
    );
    return partnerships.map((partnership) =>
      this.userProfileMapper.toDto(partnership),
    );
  }

  @Post('invite/:userId')
  async inviteUser(
    @Req() req: Request,
    @Param('userId') userId: string,
  ): Promise<void> {
    const initiatorUserId = req.user.id;
    await this.partnershipService.inviteUser(initiatorUserId, userId);
  }

  @Post('accept/:partnershipId')
  async acceptPartnership(
    @Req() req: Request,
    @Param('partnershipId') partnershipId: number,
  ): Promise<RetrievePartnershipRecordDto> {
    const userId = req.user.id;
    const partnership = await this.partnershipService.acceptPartnership(
      partnershipId,
      userId,
    );
    return this.partnershipMapper.toDto(partnership);
  }

  @Delete('cancel/:partnershipId')
  async cancelPartnership(
    @Req() req: Request,
    @Param('partnershipId') partnershipId: number,
  ): Promise<void> {
    const userId = req.user.id;
    await this.partnershipService.cancelPartnership(partnershipId, userId);
  }
}
