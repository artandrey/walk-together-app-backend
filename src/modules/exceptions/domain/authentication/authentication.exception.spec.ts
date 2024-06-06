import { AuthenticationException } from './authentication.exception';

describe('AuthenticationException', () => {
  it('should be defined', () => {
    expect(new AuthenticationException()).toBeDefined();
  });
});
