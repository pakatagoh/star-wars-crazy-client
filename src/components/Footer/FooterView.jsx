import React from 'react';
import styled from 'styled-components';
import Block from '../Block/Block';

const FooterView = () => {
  const StyledLink = styled.a`
    color: ${props => (props.theme.secondary ? props.theme.secondary : 'white')};

    &:hover {
      color: ${props => (props.theme.secondaryHover ? props.theme.secondaryHover : 'white')};
      text-decoration: none;
    }
  `;

  const StyledListHeader = styled.li`
    font-weight: bold;
    border-bottom: 2px solid ${props => (props.theme.primary ? props.theme.primary : 'white')};
    color: ${props => (props.theme.primary ? props.theme.primary : 'white')};
  `;

  const StyledListItem = styled.li`
    font-weight: 300;
    color: ${props => (props.theme.secondary ? props.theme.secondary : 'white')};
  `;

  const StyledCopy = styled.div`
    color: ${props => (props.theme.primary ? props.theme.primary : 'white')};
  `;

  return (
    <>
      <Block container spacer={3} className="border-top border-bottom border-light px-sm-0">
        <footer data-testid="footer" className="d-flex flex-column flex-sm-row justify-content-sm-between">
          <div className="mb-3 mb-sm-0">
            <p>Star Wars and any associated names are copyright Lucasfilm ltd.</p>
            <p>
              Data used for the quizes were collected freely using{' '}
              <StyledLink href="https://swapi.co/">Star Wars API (SWAPI)</StyledLink>
            </p>
            <p>
              Data for character quotes were sourced from <StyledLink href="https://codepen.io/">Codepen</StyledLink>{' '}
              user <StyledLink href="https://codepen.io/joanjetson/">Joan Jetson</StyledLink>
            </p>
            <p>
              <StyledLink href="https://github.com/pakatagoh/star-wars-crazy-client" className="font-weight-bold">
                Github Repo
              </StyledLink>
            </p>
          </div>
          <div className="d-flex flex-column flex-sm-row">
            <ul className="list-unstyled ml-sm-5 mb-3 mb-sm-0">
              <StyledListHeader className="d-inline-block mb-3">Tech & Packages</StyledListHeader>
              <StyledListItem className="mb-1">
                <StyledLink href="https://reactjs.org/">React (CRA, Hooks)</StyledLink>
              </StyledListItem>
              <StyledListItem className="mb-1">
                <StyledLink href="https://reactstrap.github.io/">reactstrap</StyledLink>
              </StyledListItem>
              <StyledListItem className="mb-1">
                <StyledLink href="https://www.styled-components.com/">styled-components</StyledLink>
              </StyledListItem>
              <StyledListItem className="mb-1">
                <StyledLink href="https://github.com/axios/axios">axios</StyledLink>
              </StyledListItem>
              <StyledListItem className="mb-1">
                <StyledLink href="https://github.com/kentcdodds/react-testing-library">
                  react-testing-library
                </StyledLink>
              </StyledListItem>
            </ul>
            <ul className="list-unstyled ml-sm-5 mb-3 mb-sm-0">
              <StyledListHeader className="d-inline-block mb-3">Social</StyledListHeader>
              <StyledListItem className="mb-1">
                <StyledLink href="https://github.com/pakatagoh">Github</StyledLink>
              </StyledListItem>
              <StyledListItem className="mb-1">
                <StyledLink href="https://www.linkedin.com/in/pakata-goh/">LinkedIn</StyledLink>
              </StyledListItem>
              <StyledListItem className="mb-1">
                <StyledLink href="https://www.instagram.com/paka.codes/">Instagram</StyledLink>
              </StyledListItem>
            </ul>
          </div>
        </footer>
      </Block>
      <Block container spacer={1} className="px-sm-0">
        <StyledCopy>© Built and tested (as much as possible) by Pakata Goh</StyledCopy>
      </Block>
    </>
  );
};

export default FooterView;
