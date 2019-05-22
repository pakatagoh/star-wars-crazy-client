import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotateZ(0);
  }
  50% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

const StyledImageWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  animation-name: ${spin};
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <StyledImageWrapper>
        <StyledImage src="https://i.pinimg.com/originals/60/b7/30/60b73041000047d4e8737d4eee9c5a08.png" alt="spinner" />
      </StyledImageWrapper>
    </div>
  );
};

export default Spinner;
