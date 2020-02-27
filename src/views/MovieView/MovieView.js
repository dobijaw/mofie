import React from 'react';

import MovieListWrapper from '../../components/MovieListWrapper/MovieListWrapper';
import Title from '../../components/Title/Title';

const MovieView = () => (
  <>
    <Title headline="Find movie for you" />
    <MovieListWrapper />
  </>
);
export default MovieView;
