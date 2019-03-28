import React from 'react';
import Title from '../Typography/Title';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="d-flex flex-column">
      <Title as="h3">Leaderboard</Title>
      <ul>
        {leaderboard.length > 0 &&
          leaderboard.map(({ email, firstName, score }) => (
            <li key={email}>
              <span>{firstName}</span>
              <span>{score}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
