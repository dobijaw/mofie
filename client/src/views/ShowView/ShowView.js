import React from 'react';
import SearchProduction from 'components/SearchProduction/SearchProduction';
import MainTemplate from 'templates/MainTemplate/MainTemplate';

const ShowView = () => (
  <MainTemplate>
    <SearchProduction title="Search shows" fetchType="tv" />
  </MainTemplate>
);

export default ShowView;
