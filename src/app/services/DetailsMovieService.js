import api from './api';

import movie from '../models/Movie';

class DetailsMovieService {
  async run(movieId) {
    const response = await api.get(`movie/${movieId}`, {
      params: {
        api_key: '236b2a1f134505cda3327cc49273e2ff',
        language: 'pt-BR',
        append_to_response: 'release_dates,videos,images,credits',
      },
    });

    const movieDetails = response.data;

    const releaseDate = movieDetails.release_dates.results.find(
      rd => rd.iso_3166_1 === 'BR'
    );
    [movie.releaseDate] = releaseDate.release_dates;

    movie.trailer = await this.getTrailer(movieDetails.videos, movieDetails.id);
    movie.genres = movieDetails.genres;

    movie.id = movieDetails.id;
    movie.title = movieDetails.title;
    movie.overview = movieDetails.overview;
    movie.productionCompanies = movieDetails.production_companies;
    movie.credits = movieDetails.credits;
    movie.runtime = movieDetails.runtime;
    movie.vote_average = movieDetails.vote_average;
    movie.vote_count = movieDetails.vote_count;
    movie.country = movieDetails.original_language;
    movie.poster_path = movieDetails.poster_path;

    return movie;
  }

  async getTrailer(responseVideos, movieId) {
    let videos = responseVideos;
    if (videos.length === 0) {
      const response = await this.api.get(`movie/${movieId}/videos`, {
        params: {
          api_key: '236b2a1f134505cda3327cc49273e2ff',
        },
      });
      videos = response.data;
    }
    const trailer = videos.results.find(video => video.type === 'Trailer');
    return trailer;
  }
}

export default new DetailsMovieService();
