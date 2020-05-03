import React from 'react';
// import { AppContext } from 'context';
import ProductionItem from 'components/ProductionList/ProductionItem/ProductionItem';
import Categories from 'components/Categories/Categories';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './CollectionView.module.scss';

const CollectionView = () => {
  // const context = useContext(AppContext);

  return (
    <>
      <PageTitle>My collection</PageTitle>
      <Categories />
      <ul className={styles.collectionList}>
        <ProductionItem
          id={123}
          title="Ad Astra"
          genres={['Drama', 'Action']}
          releaseDate="2020-06-01"
          image="https://bit.ly/2yeV4Tg"
          productionType="movie"
          categoryAdded="hello"
          tagline="Hello"
          rate={9}
          noModal
        />
      </ul>
    </>
  );
};

export default CollectionView;
