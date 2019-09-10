import api from './api';
import { random } from '../utils/number';

export default class MovieService {
  constructor() {
    this.api = api;
  }

  async getRandom(
    minYear = 2015,
    maxYear = 2015,
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
      return this.getRandom();
    }

    return responseRandomPage.data.results[randomIndex].id;
  }

  // Private
  createFilter(certificatio, maxYear, minYear, genres) {
    const params = {
      api_key: '236b2a1f134505cda3327cc49273e2ff',
      language: 'pt-BR',
      region: 'BR',
      certificação_country: 'BR',
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
