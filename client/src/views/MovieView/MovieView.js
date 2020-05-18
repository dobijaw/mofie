import React from 'react';
import SearchProduction from 'components/SearchProduction/SearchProduction';
import MainTemplate from 'templates/MainTemplate/MainTemplate';

const MovieView = () => (
  <MainTemplate>
    <SearchProduction title="Search movies" fetchType="movie" />
  </MainTemplate>
);

export default MovieView;
