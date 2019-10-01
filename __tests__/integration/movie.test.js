import movieController from '../../src/app/controllers/MovieController';

import detailsMovieService from '../../src/app/services/DetailsMovieService';
import randomMovieService from '../../src/app/services/RandomMovieService';
import trailerService from '../../src/app/services/TrailerService';

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
    const movieId = 256835;
    const movieDetails = await detailsMovieService.run(movieId);

    expect(movieDetails.id).toBe(movieId);
  });

  it('should fetch all the details of a movie by id with trailer in imdb api', async () => {
    const movieId = 381719;
    const movieDetails = await detailsMovieService.run(movieId);

    expect(movieDetails.id).toBe(movieId);
  });

  it('should look for a youtube api movie trailer by name', async () => {
    const movieTitle = 'Mentes Sombrias';
    const movieReleaseDate = 2018;
    const trailerId = await trailerService.run(movieTitle, movieReleaseDate);

    expect(trailerId).toBeDefined();
  });
});
