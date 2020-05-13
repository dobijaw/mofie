import React, { useState, useContext } from 'react';
import { AppContext } from 'context';
import ProductionItem from 'components/ProductionList/ProductionItem/ProductionItem';
import Categories from 'components/Categories/Categories';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './CollectionView.module.scss';

const CollectionView = () => {
  const context = useContext(AppContext);
  const [category, setCategory] = useState('all');

  const handleClick = (categoryClicked) => {
    setCategory(categoryClicked);
  };

  return (
    <>
      <PageTitle>My collection</PageTitle>
      <Categories handleClick={handleClick} />
      <ul className={styles.collectionList}>
        {context.stateCollections
          .filter((c) =>
            category === 'all' ? c : category === c.customData?.category?.id,
          )
          .map((c) => (
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
              customRate={c.customData?.rate?.value}
              customCategory={c.customData?.category?.value}
              noModal
            />
          ))}
      </ul>
    </>
  );
};

export default CollectionView;
