import React from 'react';
import Title from '../../components/Title/Title';
import MovieList from '../../components/MovieList/MovieList';

import AppContext from '../../context';

const CollectionView = () => {
  return (
    <AppContext.Consumer>
      {context => (
        <>
          <Title headline="My collection" />
          <MovieList movies={context.movieCollection} />
        </>
      )}
    </AppContext.Consumer>
  );
};

export default CollectionView;
