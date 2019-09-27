import movieController from '../../src/app/controllers/MovieController';
import DetailsMovieService from '../../src/app/services/DetailsMovieService';
import randomMovieService from '../../src/app/services/RandomMovieService';

describe('controllers', () => {
  it('should return a instance of MovieController', () => {
    expect(movieController).not.toBeNull();
    expect(movieController).not.toBeUndefined();
  });

  it('should fetch a random movie', async () => {
    const movie = await movieController.show();

    expect(movie).not.toBeNull();
    expect(movie).not.toBeUndefined();
  });
});

describe('Services', () => {
  it('should return the id of one random movie', async () => {
    const movieId = await randomMovieService.run();

    expect(movieId).not.toBeUndefined();
    expect(movieId).toBeGreaterThan(0);
  });

  it('should fetch all the details of a movie by id', async () => {
    const movieDetails = await DetailsMovieService.run(256835);

    expect(movieDetails.id).toBe(256835);
  });
});
