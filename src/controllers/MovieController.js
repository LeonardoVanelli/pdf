import MovieService from '../services/MovieService';

export default class MovieController {
  constructor() {
    this.movieService = new MovieService();
  }

  show() {}
}
