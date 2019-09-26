import movie from '../../src/app/models/Movie';

describe('Tests of model', () => {
  it('should return model', () => {
    expect(movie).not.toBeNull();
  });
});
