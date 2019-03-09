import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/Typography/Title';
import Block from '../../../components/Block/Block';
import { STAR_WARS_EPISODES } from './../../../components/services/movie/starWarsEpisodes';

const MoviePage = () => {
  const StyledSpacer = styled.div`
    margin-bottom: 500px;
  `;

  return (
    <main>
      <Block container spacer={2}>
        <div className="row">
          <div className="col-2">
            <ul className="list-unstyled">
              {STAR_WARS_EPISODES.map(episode => (
                <li key={episode.number} className="mb-4">
                  <NavLink to={episode.to}>
                    <Title as="h3" className="h5">{`Star Wars Episode ${episode.number}`}</Title>
                    <span>{episode.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-10">
            <Switch>
              <Route exact />
            </Switch>
            <StyledSpacer>main content here</StyledSpacer>
            <StyledSpacer>main content here</StyledSpacer>
            <StyledSpacer>main content here</StyledSpacer>
            <StyledSpacer>main content here</StyledSpacer>
          </div>
        </div>
      </Block>
    </main>
  );
};

export default MoviePage;
