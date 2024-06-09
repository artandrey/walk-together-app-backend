import { UserProfileModel } from '../../models/user-profile.model';

export interface IPartnerService {
  sendInvitation(
    senderUserId: string,
    receiverUserId: string,
  ): Promise<UserProfileModel>;
  acceptInvitation(invitationId: string): Promise<UserProfileModel>;
}
