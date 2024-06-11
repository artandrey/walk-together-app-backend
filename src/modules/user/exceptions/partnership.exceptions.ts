import { ClientException } from 'src/modules/exceptions/domain/client-exception/client.exception';

export class TooManyPartnershipsException extends ClientException {
  public static readonly CODE = 'TOO_MANY_PARTNERSHIPS';

  constructor() {
    super(
      TooManyPartnershipsException.CODE,
      'User already has 3 accepted partnerships',
    );
  }
}

export class SelfInviteException extends ClientException {
  public static readonly CODE = 'SELF_INVITE';

  constructor() {
    super(
      SelfInviteException.CODE,
      'User cannot invite themselves to a partnership',
    );
  }
}

export class AlreadyPartnerException extends ClientException {
  public static readonly CODE = 'ALREADY_PARTNER';

  constructor() {
    super(AlreadyPartnerException.CODE, 'User is already a partner');
  }
}

export class PartnershipNotFoundException extends ClientException {
  public static readonly CODE = 'PARTNERSHIP_NOT_FOUND';

  constructor() {
    super(PartnershipNotFoundException.CODE, 'Partnership record not found');
  }
}

export class NotInvitedUserException extends ClientException {
  public static readonly CODE = 'NOT_INVITED_USER';

  constructor() {
    super(
      NotInvitedUserException.CODE,
      'User is not the invited user for this partnership',
    );
  }
}

export class NotPartOfPartnershipException extends ClientException {
  public static readonly CODE = 'NOT_PART_OF_PARTNERSHIP';

  constructor() {
    super(
      NotPartOfPartnershipException.CODE,
      'User is not part of this partnership',
    );
  }
}
