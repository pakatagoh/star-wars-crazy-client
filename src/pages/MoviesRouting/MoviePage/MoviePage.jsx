import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Block from '../../../components/Block/Block';
import MoviePageNav from './MoviePageNav';
import { tmdbApiGetMovie } from '../../../components/services/movie/tmdbApi';
import { STAR_WARS_EPISODES } from './../../../components/services/movie/starWarsEpisodes';
import Title from '../../../components/Typography/Title';
import Subtitle from './../../../components/Typography/Subtitle';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top;
`;

const MoviePage = props => {
  const { slug } = props.match.params;
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const fetchMovie = async imdbId => {
    try {
      const foundMovie = await tmdbApiGetMovie(imdbId);
      if (foundMovie) {
        setIsLoading(false);
        setMovieData(foundMovie);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    setReload(!reload);
  };

  useEffect(() => {
    const foundEpisode = STAR_WARS_EPISODES.find(episode => episode.slug === slug);
    if (foundEpisode) {
      fetchMovie(foundEpisode.imdb);
    }
  }, [reload]);

  const { overview, release_date, title, vote_average, cast, imageSrc } = movieData;
  const renderMovieDetails = () => {
    return (
      <>
        <div className="row mb-3">
          <div className="col-md-5">
            <StyledImage src={imageSrc} alt={title} />
          </div>
          <div className="col-md-7">
            <Title as="h1" className="h3">
              {title}
            </Title>
            <div className="row mb-4">
              <div className="col">
                <small>Released: {release_date}</small>
              </div>
              <div className="col">
                <small>Ratings: {vote_average * 10}%</small>
              </div>
            </div>
            <div className="row">
              {cast && cast.length > 0 ? (
                cast.map(person => (
                  <div className="col-6 mb-2" key={person.name}>
                    <Subtitle className="mb-1">{person.name}</Subtitle>
                    <small>as</small>
                    <Subtitle className="mb-1">{person.character}</Subtitle>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>{overview}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <main>
      <Block container spacer={2}>
        <div className="row">
          <div className="col-2 col-sm-3">
            <MoviePageNav handleClick={handleClick} />
          </div>
          <div className="col-10 col-sm-9">{isLoading ? <p>Loading...</p> : renderMovieDetails()}</div>
        </div>
      </Block>
    </main>
  );
};

export default MoviePage;
