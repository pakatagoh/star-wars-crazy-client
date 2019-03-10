import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import produce from 'immer';
import MoviesPage from './MoviesPage/MoviesPage';
import MoviePage from './MoviePage/MoviePage';
import { tmdbApiGetMovie } from './../../components/services/movie/tmdbApi';

const MoviesRouting = props => {
  console.log(props.match);
  console.log(props.location);
  const [currentEpisodeId, setCurrentEpisode] = useState('');
  const [movies, setMovies] = useState({});

  const fetchMovie = async imdbId => {
    try {
      const foundMovie = await tmdbApiGetMovie(imdbId);
      if (foundMovie) {
        const updater = state => {
          return produce(state, draft => {
            draft[currentEpisodeId] = foundMovie;
          });
        };
        setMovies(updater);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentEpisodeId) {
      fetchMovie(currentEpisodeId);
    }
  }, [currentEpisodeId]);

  const handleClick = imdbId => {
    if (imdbId) setCurrentEpisode(imdbId);
  };

  const currentMovieProps = {
    ...movies[currentEpisodeId],
  };

  return (
    <Switch>
      <Route exact path="/movies" render={props => <MoviesPage {...props} handleClick={handleClick} />} />
      <Route path="/movies/:slug" render={props => <MoviePage {...props} />} />
    </Switch>
  );
};

export default MoviesRouting;
