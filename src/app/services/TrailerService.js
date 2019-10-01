import api from './api';

class TrailerService {
  async run(movieTitle, movieReleaseDate) {
    const response = await api.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'id',
          type: 'video',
          maxResults: 1,
          q: `${movieTitle} ${movieReleaseDate} trailer`,
          key: process.env.REACT_APP_GYT_KEY,
        },
      }
    );
    const [videoId] = response.data.items;
    return videoId.id.videoId;
  }
}

export default new TrailerService();
