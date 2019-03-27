import React from 'react';
import Title from '../Typography/Title';

const Leaderboard = () => {
  return (
    <div className="d-flex flex-column">
      <Title>Leaderboard</Title>
      <ul>
        <li>
          <span>Pakata</span>
          <span>1000pts</span>
        </li>
        <li>
          <span>Pakata</span>
          <span>1000pts</span>
        </li>
        <li>
          <span>Pakata</span>
          <span>1000pts</span>
        </li>
      </ul>
    </div>
  );
};

export default Leaderboard;
