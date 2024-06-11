import { Inject, Injectable } from '@nestjs/common';
import {
  SelfInviteException,
  TooManyPartnershipsException,
  AlreadyPartnerException,
  PartnershipNotFoundException,
  NotInvitedUserException,
  NotPartOfPartnershipException,
} from '../../exceptions/partnership.exceptions';
import { PartnershipModel } from '../../models/partnership.model';
import { IPartnershipRecordRepository } from '../../repository/partnership/partnership-repository.interface';
import { PARTNERSHIP_REPOSITORY, PROFILE_SERVICE } from '../../constants';
import { IUserProfileService } from '../user-profile/user-profile-service.interface';

@Injectable()
export class PartnershipService {
  constructor(
    @Inject(PARTNERSHIP_REPOSITORY)
    private readonly partnershipRepository: IPartnershipRecordRepository,
    @Inject(PROFILE_SERVICE)
    private readonly profileService: IUserProfileService,
  ) {}

  async getPartnerships(userId: string): Promise<PartnershipModel[]> {
    return this.partnershipRepository.findByUserId(userId);
  }

  async inviteUser(
    initiatorUserId: string,
    invitedUserId: string,
  ): Promise<void> {
    if (initiatorUserId === invitedUserId) {
      throw new SelfInviteException();
    }

    const existingPartnershipsCount =
      await this.partnershipRepository.countAcceptedPartnerships(
        initiatorUserId,
      );
    if (existingPartnershipsCount >= 3) {
      throw new TooManyPartnershipsException();
    }

    const isAlreadyPartner = await this.partnershipRepository.isPartner(
      initiatorUserId,
      invitedUserId,
    );
    if (isAlreadyPartner) {
      throw new AlreadyPartnerException();
    }

    await this.partnershipRepository.create({
      initiatorUserId,
      invitedUserId,
    });
  }

  async acceptPartnership(
    partnershipId: number,
    userId: string,
  ): Promise<PartnershipModel> {
    const partnership =
      await this.partnershipRepository.findById(partnershipId);
    if (!partnership) {
      throw new PartnershipNotFoundException();
    }

    if (partnership.invited.userId !== userId) {
      throw new NotInvitedUserException();
    }

    const existingPartnershipsCount =
      await this.partnershipRepository.countAcceptedPartnerships(userId);
    if (existingPartnershipsCount >= 3) {
      throw new TooManyPartnershipsException();
    }

    partnership.isAccepted = true;
    return this.partnershipRepository.update(partnershipId, partnership);
  }

  async cancelPartnership(
    partnershipId: number,
    userId: string,
  ): Promise<void> {
    const partnership =
      await this.partnershipRepository.findById(partnershipId);
    if (!partnership) {
      throw new PartnershipNotFoundException();
    }

    if (
      partnership.initiator.userId !== userId &&
      partnership.invited.userId !== userId
    ) {
      throw new NotPartOfPartnershipException();
    }

    await this.partnershipRepository.delete(partnershipId);
  }

  async getPartnersWithRecords(userId: string, from: Date, to: Date) {
    const partnerships = await this.getPartnerships(userId);
    const partnersWithRecords = await Promise.all(
      partnerships
        .filter((partnership) => partnership.isAccepted)
        .map((partnership) => {
          const partnerId =
            partnership.initiator.userId === userId
              ? partnership.invited.userId
              : partnership.initiator.userId;

          return this.profileService.getProfile(partnerId, { from, to });
        }),
    );
    return partnersWithRecords;
  }
}
