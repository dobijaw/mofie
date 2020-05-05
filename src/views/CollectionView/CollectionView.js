import React, { useContext } from 'react';
import { AppContext } from 'context';
import ProductionItem from 'components/ProductionList/ProductionItem/ProductionItem';
import Categories from 'components/Categories/Categories';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './CollectionView.module.scss';

const CollectionView = () => {
  const context = useContext(AppContext);

  return (
    <>
      <PageTitle>My collection</PageTitle>
      <Categories />
      <ul className={styles.collectionList}>
        {context.stateCollections.map((c) => (
          <ProductionItem
            key={c.id}
            id={c.id}
            title={c.data.title}
            genres={c.data.genres}
            releaseDate={c.releaseDate}
            image={c.data.image}
            productionType={c.type}
            tagline={c.data.tagline}
            rate={c.data.rate}
            customRate={c.customData?.rate?.name}
            customCategory={c.customData?.category?.name}
            noModal
          />
        ))}
      </ul>
    </>
  );
};

export default CollectionView;
