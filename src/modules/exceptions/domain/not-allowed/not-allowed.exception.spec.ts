import { NotAllowedException } from './not-allowed.exception';

describe('NotAllowedException', () => {
  it('should be defined', () => {
    expect(new NotAllowedException()).toBeDefined();
  });
});
