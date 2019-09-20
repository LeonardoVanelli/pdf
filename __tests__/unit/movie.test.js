import Movie from '../../src/app/models/Movie';

describe('Tests of model', () => {
  it('should return model', () => {
    const movie = new Movie();

    expect(movie).not.toBeNull();
  });
});
