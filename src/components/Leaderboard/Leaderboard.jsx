import React from 'react';
import styled from 'styled-components';
import Title from '../Typography/Title';

const StyledWrapper = styled.div`
  max-width: 200px;
  display: flex;
  flex-direction: column;
`;

const Leaderboard = ({ leaderboard }) => {
  return (
    <StyledWrapper>
      <Title as="h3" className="mb-3">
        Leaderboard
      </Title>
      <ul className="list-unstyled">
        <li className="d-flex justify-content-between mb-1">
          <span className="font-weight-bold">Name</span>
          <span className="font-weight-bold">Score</span>
        </li>
        {leaderboard.length > 0 &&
          leaderboard.map(({ email, firstName, score }) => (
            <li key={email} className="d-flex justify-content-between">
              <span>{firstName}</span>
              <span>{score}</span>
            </li>
          ))}
      </ul>
    </StyledWrapper>
  );
};

export default Leaderboard;
