import api from './api';
import { random } from '../utils/number';
import Movie from '../models/Movie';

export default class MovieService {
  constructor() {
    this.api = api;
  }

  async getRandom(
    minYear = null,
    maxYear = null,
    genres = [],
    certificatio = '12'
  ) {
    const params = this.createFilter(certificatio, maxYear, minYear, genres);

    const response = await this.api.get('/discover/movie', {
      params,
    });

    if (response.data.results.length === 0) throw new Error('No movies found');

    params.page = random(String(response.data.total_pages));

    if (params.page === 0) params.page = 1;

    const responseRandomPage = await this.api.get('/discover/movie', {
      params,
    });

    const randomIndex = random(responseRandomPage.data.results.length - 1);

    if (responseRandomPage.data.results[randomIndex].overview === '') {
      return this.getRandom(minYear, maxYear, genres, certificatio);
    }

    return responseRandomPage.data.results[randomIndex].id;
  }

  async getDetails(movieId) {
    const response = await this.api.get(`movie/${movieId}`, {
      params: {
        api_key: '236b2a1f134505cda3327cc49273e2ff',
        language: 'pt_BR',
        append_to_response: 'release_dates,videos,images,credits',
      },
    });

    const movieDetails = response.data;

    const movie = new Movie();

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

  // Private
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

  createFilter(certificatio, maxYear, minYear, genres) {
    const params = {
      api_key: '236b2a1f134505cda3327cc49273e2ff',
      language: 'pt-BR',
      region: 'BR',
      certification_country: 'BR',
      'certification.lte': certificatio,
      adult: true,
    };
    if (maxYear) {
      params['release_date.lte'] = new Date(maxYear, 12, 31).toJSON();
    }
    if (minYear) {
      params['release_date.gte'] = new Date(minYear, 1, 1).toJSON();
    }
    if (genres.length > 0) {
      params.with_genres = genres.join(',');
    }
    return params;
  }
}
