import MovieService from '../services/MovieService';

export default class MovieController {
  constructor() {
    this.movieService = new MovieService();
  }

  async show() {
    const randomMovieId = await this.movieService.getRandom();
    const movieDetails = await this.movieService.getDetails(randomMovieId);
    return movieDetails;
  }
}
