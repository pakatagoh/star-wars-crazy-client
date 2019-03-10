import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import styled, { css } from 'styled-components';
import Block from './../../../components/Block/Block';
import Title from './../../../components/Typography/Title';
import { STAR_WARS_EPISODES } from './../../../components/services/movie/starWarsEpisodes';
import { sizes } from './../../../utils/styledSizes';
import Subtitle from './../../../components/Typography/Subtitle';

const MoviesPage = () => {
  // https://www.styled-components.com/docs/advanced#media-templates
  // Iterate through the sizes and create a media template
  const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (min-width: ${sizes[label]}px) {
        ${css(...args)}
      }
    `;
    return acc;
  }, {});

  const StyledImage = styled.img`
    width: 100%;
    height: 14rem;
    object-fit: contain;
    object-position: center;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    transform: scale(1);
    transition: box-shadow 0.3s linear, transform 0.3s linear;

    &:hover {
      box-shadow: 0 0 30px -1px ${props => (props.theme.secondary ? props.theme.secondary : 'white')};
      transform: scale(1.02);
    }

    ${media.md`height: 16rem;`};
    ${media.lg`height: 18rem;`};
  `;

  const StyledNavLink = styled(NavLink)`
    &:hover {
      text-decoration: none;
    }
  `;

  return (
    <main>
      <Block container>
        <Row>
          {STAR_WARS_EPISODES.map(episode => (
            <Col sm={6} md={3} className="mb-5">
              <div>
                <StyledNavLink to={episode.to}>
                  <div className="d-flex flex-column align-items-center">
                    <StyledImage src={episode.poster} alt={`star wars episode ${episode.number}`} />
                    <div className="mt-2 mt-sm-3">
                      <Title as="h3" className="h5 text-center mb-0">{`Star Wars Episode ${episode.number}`}</Title>
                      <Subtitle className="h6 text-center">{episode.title}</Subtitle>
                    </div>
                  </div>
                </StyledNavLink>
              </div>
            </Col>
          ))}
        </Row>
      </Block>
    </main>
  );
};

export default MoviesPage;
