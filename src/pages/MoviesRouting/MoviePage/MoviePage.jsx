import React from 'react';
import Block from '../../../components/Block/Block';
import MoviePageNav from './MoviePageNav';

const MoviePage = props => {
  return (
    <main>
      <Block container spacer={2}>
        <div className="row">
          <div className="col-2">
            <MoviePageNav />
          </div>
          <div className="col-10">main content</div>
        </div>
      </Block>
    </main>
  );
};

export default MoviePage;
