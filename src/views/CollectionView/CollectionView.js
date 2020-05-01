import React, { useContext } from 'react';
import Loading from 'components/Loading/Loading';
import { AppContext } from 'context';
import MovieItem from 'components/MovieList/MovieItem/MovieItem';
import Title from '../../components/Title/Title';

const CollectionView = () => {
  const context = useContext(AppContext);

  return (
    <>
      <Title headline="My collection" />
      {context.stateCollections.map((m) => (
        <ul>
          <MovieItem
            productionType={m.type}
            key={m.id}
            year={m.data.release_date}
            genres={m.data.genres.map((g) => g.name)}
            type="button"
            title={m.data.original_title}
            img={`http://image.tmdb.org/t/p/w500/${m.data.backdrop_path}`}
          />
        </ul>
      ))}
      <Loading />
    </>
  );
};

export default CollectionView;
