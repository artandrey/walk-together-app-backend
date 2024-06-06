import { ServerException } from './server.exception';

describe('ServerException', () => {
  it('should be defined', () => {
    expect(new ServerException()).toBeDefined();
  });
});
