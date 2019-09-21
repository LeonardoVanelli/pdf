export default class Movie {
  constructor() {
    this.id = 0;
    this.title = '';
    this.overview = '';
    this.releaseDate = null;
    this.productionCompanies = null;
    this.genres = null;
    this.credits = null;
    this.runtime = 0;
    this.vote_average = 0;
    this.vote_count = 0;
    this.trailer = null;
    this.poster_path = null;
    this.country = '';
  }

  get certification() {
    if (this.releaseDate && this.releaseDate.certification !== '')
      return this.releaseDate.certification;
    return null;
  }
}
