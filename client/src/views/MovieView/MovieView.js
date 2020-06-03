import React from 'react';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import SearchProduction from 'components/SearchProduction/SearchProduction';

const MovieView = () => (
  <MainTemplate footerSpace>
    <SearchProduction title="Search movies" fetchType="movie" />
  </MainTemplate>
);

export default MovieView;
