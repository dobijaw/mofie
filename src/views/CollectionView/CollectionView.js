import React, { useContext } from 'react';
import { AppContext } from 'context';
import MovieItem from 'components/MovieList/MovieItem/MovieItem';
import Categories from 'components/Categories/Categories';
import Title from '../../components/Title/Title';

const CollectionView = () => {
  const context = useContext(AppContext);

  return (
    <>
      <Title headline="My collection" />
      <Categories />
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
    </>
  );
};

export default CollectionView;
