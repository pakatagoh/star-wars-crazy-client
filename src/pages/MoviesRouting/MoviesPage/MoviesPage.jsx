import React from 'react';
import { NavLink } from 'react-router-dom';
import Block from './../../../components/Block/Block';
import { STAR_WARS_EPISODES } from './../../../components/services/movie/starWarsEpisodes';

const MoviesPage = () => {
  return (
    <main>
      <Block>
        <ul>
          {STAR_WARS_EPISODES.map(episode => (
            <li>
              <NavLink to={episode.to}>
                <img src={episode.poster} alt={`star wars episode ${episode.number}`} />
                <div>{`Star Wars Episode ${episode.number}`}</div>
                <span>{episode.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </Block>
    </main>
  );
};

export default MoviesPage;
