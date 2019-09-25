import DetailsMovieService from '../services/DetailsMovieService';
import RandomMovieService from '../services/RandomMovieService';

class MovieController {
  async show() {
    const randomMovieId = await RandomMovieService.run();
    const movieDetails = await DetailsMovieService.run(randomMovieId);
    return movieDetails;
  }
}

export default new MovieController();
