import api from '../../src/app/services/api';

describe('api with axios', () => {
  it('should return an instance of axios', () => {
    expect(api).not.toBeNull();
  });
});
