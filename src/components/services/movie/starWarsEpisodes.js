import { posters } from './../../../assets/posters';

export const STAR_WARS_EPISODES = [
  { number: 1, title: 'The Phantom Menace', to: '/movies/episode-1', imdb: 'tt0120915', poster: posters.episode_1 },
  {
    number: 2,
    title: 'The Attack of the Clones',
    to: '/movies/episode-2',
    imdb: 'tt0121765',
    poster: posters.episode_2,
  },
  { number: 3, title: 'Revenge of the Sith', to: '/movies/episode-3', imdb: 'tt0121766', poster: posters.episode_3 },
  { number: 4, title: 'A New Hope', to: '/movies/episode-4', imdb: 'tt0076759', poster: posters.episode_4 },
  {
    number: 5,
    title: 'The Empire Strikes Back',
    to: '/movies/episode-5',
    imdb: 'tt0080684',
    poster: posters.episode_5,
  },
  { number: 6, title: 'The Return of the Jedi', to: '/movies/episode-6', imdb: 'tt0086190', poster: posters.episode_6 },
  { number: 7, title: 'The Force Awakens', to: '/movies/episode-7', imdb: 'tt2488496', poster: posters.episode_7 },
  { number: 8, title: 'The Last Jedi', to: '/movies/episode-8', imdb: 'tt2527336', poster: posters.episode_8 },
];
