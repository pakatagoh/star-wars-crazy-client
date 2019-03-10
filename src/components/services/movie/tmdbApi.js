import axios from 'axios';

export const tmdbMovieFindApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/find',
});

export const tmdbMovieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
});

export const tmdbMovieCreditsApi = async movie_id => {
  return await tmdbMovieApi.get(`/${movie_id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
};

export const tmdbApiGetMovie = async imdbId => {
  try {
    const movieFindResponse = await tmdbMovieFindApi.get(
      `/${imdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&external_source=imdb_id`
    );
    const foundMovie = movieFindResponse.data.movie_results[0];
    const { id: movie_id, overview, poster_path, release_date, title, vote_average } = foundMovie;
    const creditsResponse = await tmdbMovieCreditsApi(movie_id);
    const { cast } = creditsResponse.data;
    return {
      id: movie_id,
      overview,
      release_date,
      title,
      vote_average,
      cast: cast.splice(0, 4),
      imageSrc: `https://image.tmdb.org/t/p/w342${poster_path}`,
    };
  } catch (error) {
    console.error(error);
  }
};
