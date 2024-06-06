import { ClientException } from './client.exception';

describe('ClientException', () => {
  it('should be defined', () => {
    expect(new ClientException()).toBeDefined();
  });
});
