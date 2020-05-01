import React from 'react';

import Loading from 'components/Loading/Loading';
import Title from '../../components/Title/Title';
// import MovieList from '../../components/MovieList/MovieList';

// import AppContext from '../../context';

const CollectionView = () => {
  // const context = useContext(AppContext);

  return (
    <>
      <Title headline="My collection" />
      {/* <MovieList movies={context.movieCollection} /> */}
      <Loading />
    </>
  );
};

export default CollectionView;
