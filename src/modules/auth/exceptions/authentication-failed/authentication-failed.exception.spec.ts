import { AuthenticationFailedException } from './authentication-failed.exception';

describe('AuthenticationFailedException', () => {
  it('should be defined', () => {
    expect(new AuthenticationFailedException()).toBeDefined();
  });
});
