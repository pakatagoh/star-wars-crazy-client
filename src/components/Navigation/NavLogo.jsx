import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavLogo = props => {
  const { src, to, alt } = props;

  const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  `;

  const StyledImageContainer = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: black;
  `;

  return (
    <Link to={to}>
      <StyledImageContainer>
        <StyledImage src={src} alt={alt} />
      </StyledImageContainer>
    </Link>
  );
};

export default NavLogo;
