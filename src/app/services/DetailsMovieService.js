import api from './api';

import movie from '../models/Movie';

import trailerService from './TrailerService';

class DetailsMovieService {
  async run(movieId) {
    const response = await api.get(`movie/${movieId}`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: 'pt-BR',
        append_to_response: 'release_dates,videos,images,credits',
      },
    });

    const movieDetails = response.data;

    const releaseDate = movieDetails.release_dates.results.find(
      rd => rd.iso_3166_1 === 'BR'
    );
    [movie.releaseDate] = releaseDate.release_dates;

    if (movieDetails.videos.results.length === 0) {
      movie.trailer = await trailerService.run(
        movieDetails.title,
        movie.releaseYear
      );
    } else {
      const videoTrailer = movieDetails.videos.results.find(
        video => video.type === 'Trailer'
      );
      movie.trailer = videoTrailer.key;
    }

    movie.genres = movieDetails.genres;

    movie.id = movieDetails.id;
    movie.title = movieDetails.title;
    movie.overview = movieDetails.overview;
    movie.productionCompanies = movieDetails.production_companies;
    movie.credits = movieDetails.credits;
    movie.runtime = movieDetails.runtime;
    movie.voteAverage = movieDetails.vote_average;
    movie.voteCount = movieDetails.vote_count;
    movie.country = movieDetails.original_language;
    movie.posterPath = movieDetails.poster_path;

    return movie;
  }
}

export default new DetailsMovieService();
