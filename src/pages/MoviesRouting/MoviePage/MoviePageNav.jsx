import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Title from './../../../components/Typography/Title';
import Subtitle from './../../../components/Typography/Subtitle';
import { STAR_WARS_EPISODES } from './../../../components/services/movie/starWarsEpisodes';

//https://spectrum.chat/styled-components/help/how-to-use-sc-with-nav-activeclassname~8f753cea-75c3-4524-8207-fd0216026665

const activeClassName = 'border-bottom-crawl';
const StyledNavLink = styled(NavLink).attrs({
  activeClassName: activeClassName,
})`
  & {
    div {
      border-bottom: 1px solid black;
    }
  }

  &:hover,
  &.${activeClassName} {
    text-decoration: none;
    div {
      border-bottom: 1px solid ${props => (props.theme.secondary ? props.theme.secondary : 'white')};
    }
  }
`;

const MoviePageNav = props => {
  const { handleClick } = props;

  return (
    <nav className="d-flex flex-column">
      {STAR_WARS_EPISODES.map(episode => (
        <div key={episode.number} className="mb-4">
          <StyledNavLink to={episode.to} activeClassName="border-bottom-crawl" onClick={handleClick}>
            <div>
              <Title as="h3" className="h5 text-center">{`Star Wars Episode ${episode.number}`}</Title>
              <Subtitle className="h6 text-center">{episode.title}</Subtitle>
            </div>
          </StyledNavLink>
        </div>
      ))}
    </nav>
  );
};

export default MoviePageNav;
