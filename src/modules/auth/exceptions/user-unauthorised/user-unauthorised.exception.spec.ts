import { UserUnauthorisedException } from './user-unauthorised.exception';

describe('UserUnauthorisedException', () => {
  it('should be defined', () => {
    expect(new UserUnauthorisedException()).toBeDefined();
  });
});
