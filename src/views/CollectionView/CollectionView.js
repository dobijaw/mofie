import React, { useContext } from 'react';
import { AppContext } from 'context';
import ProductionItem from 'components/ProductionList/ProductionItem/ProductionItem';
import Categories from 'components/Categories/Categories';
import PageTitle from '../../components/PageTitle/PageTitle';

const CollectionView = () => {
  const context = useContext(AppContext);

  return (
    <>
      <PageTitle>My collection</PageTitle>
      <Categories />
      {context.stateCollections.map((m) => (
        <ul>
          <ProductionItem
            id={m.id}
            productionType={m.type === 'movie' ? 'movies' : 'shows'}
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
