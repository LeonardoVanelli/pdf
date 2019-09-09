import MovieController from '../../controllers/MovieController';

it('should return a instance of MovieController', () => {
  const movieController = new MovieController();

  expect(movieController).not.toBeNull();
  expect(movieController).not.toBeUndefined();
});
