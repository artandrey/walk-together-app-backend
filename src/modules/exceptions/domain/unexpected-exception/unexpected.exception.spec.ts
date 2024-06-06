import { UnexpectedException } from './unexpected.exception';

describe('UnexpectedException', () => {
  it('should be defined', () => {
    expect(new UnexpectedException()).toBeDefined();
  });
});
