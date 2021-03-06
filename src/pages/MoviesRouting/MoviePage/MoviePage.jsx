import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Media from 'react-media';
import { sizes } from './../../../utils/styledSizes';
import Block from '../../../components/Block/Block';
import MoviePageNav from './MoviePageNav';
import { getMovie } from './../../../services/movie/movieApi';
import { STAR_WARS_EPISODES } from './../../../services/movie/starWarsEpisodes';
import Title from '../../../components/Typography/Title';
import Subtitle from './../../../components/Typography/Subtitle';
import Spinner from './../../../components/Spinner/Spinner';
import MovieMenuModal from './MovieMenuModal';

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
  const [error, setError] = useState('');

  const fetchMovie = async imdbId => {
    try {
      const foundMovie = await getMovie(imdbId);
      if (foundMovie.error) {
        console.error(foundMovie.error.message);
        setError(foundMovie.error.message);
        setIsLoading(false);
        return;
      }
      setError('');
      setMovieData(foundMovie);
      setIsLoading(false);
      return;
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
      return;
    }
  };

  const handleClick = () => {
    setIsLoading(true);
  };

  const foundEpisode = STAR_WARS_EPISODES.find(episode => episode.slug === slug);

  useEffect(() => {
    if (!foundEpisode) {
      setError('Unable to find episode');
      setIsLoading(false);
    } else {
      fetchMovie(foundEpisode.imdb);
    }
  }, [foundEpisode]);

  const { overview, release_date, title, vote_average, cast, imageSrc } = movieData;
  const renderMovieDetails = () => {
    return (
      <>
        <div className="row mb-3">
          <div className="col-md-5">
            <StyledImage src={imageSrc} alt={title} />
          </div>
          <div className="col-md-7">
            <Title as="h1" className="h1">
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
                <Spinner />
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

  if (error) {
    return (
      <Block container spacer={2}>
        <Title>{error}</Title>
      </Block>
    );
  }

  return (
    <main>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Block container spacer={2}>
            <div className="row">
              <Media query={`(max-width: ${sizes.sm}px)`}>
                {matches =>
                  matches ? (
                    <MovieMenuModal handleClick={handleClick} />
                  ) : (
                    <div className="col-sm-3">
                      <MoviePageNav handleClick={handleClick} />
                    </div>
                  )
                }
              </Media>
              <div className="col-sm-9">{renderMovieDetails()}</div>
            </div>
          </Block>
          <Block container spacer={2}>
            <iframe
              src={`https://open.spotify.com/embed/album/${foundEpisode.spotifyId}`}
              width="300"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
              title="star wars album"
            />
          </Block>
        </>
      )}
    </main>
  );
};

export default MoviePage;
