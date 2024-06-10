import { DataAccessException } from './data-access.exception';

describe('RepositoryException', () => {
  it('should be defined', () => {
    expect(new DataAccessException('')).toBeDefined();
  });
});
