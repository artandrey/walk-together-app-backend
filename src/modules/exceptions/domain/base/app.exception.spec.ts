import { AppException } from './app.exception';

describe('AppException', () => {
  it('should be defined', () => {
    expect(new AppException()).toBeDefined();
  });
});
