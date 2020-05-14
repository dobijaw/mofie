import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from 'context';
import ProductionItem from 'components/ProductionList/ProductionItem/ProductionItem';
import Sort from 'components/Sort/Sort';
import { FETCH_TYPE } from 'store';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './CollectionView.module.scss';

const sortOptions = [
  {
    value: 'Added recently',
    id: 'addedrecently',
  },
  {
    value: 'Added first',
    id: 'addedfirst',
  },
  {
    value: 'Top rated',
    id: 'toprated',
  },
  {
    value: 'Lowest rated',
    id: 'lowestrated',
  },
  {
    value: 'A - Z',
    id: 'aztype',
  },
  {
    value: 'Z - A',
    id: 'zatype',
  },
];

const typeOptions = [
  {
    value: 'All',
    id: 'alltype',
  },
  {
    value: 'Movies',
    id: FETCH_TYPE.MOVIE,
  },
  {
    value: 'Shows',
    id: FETCH_TYPE.TV,
  },
];

const CollectionView = () => {
  const context = useContext(AppContext);
  const categoryOptions = [
    {
      value: 'All',
      id: 'all',
    },
    ...context.stateCategories,
  ];

  const [sortValue, setSortValue] = useState(sortOptions[0]);
  const [categoryValue, setCategoryValue] = useState(categoryOptions[0]);
  const [typeValue, setTypeValue] = useState(typeOptions[0]);
  const [sortData, setSortData] = useState(context.stateCollections);

  const sortByRated = (a, b) => {
    return +a.customData.rate.value - +b.customData.rate.value;
  };

  const sortByAlphabet = (a, b) => {
    if (a.data.title < b.data.title) return -1;
    if (a.data.title > b.data.title) return 1;

    return 0;
  };

  useEffect(() => {
    const sortByType = context.stateCollections.filter((c) =>
      typeValue.id === 'alltype' ? c : c.type === typeValue.id,
    );

    const sortByCategories = sortByType.filter((c) =>
      categoryValue.id === 'all'
        ? c
        : categoryValue.id === c.customData?.category?.id,
    );

    switch (sortValue.id) {
      case 'addedfirst':
        setSortData(sortByCategories.reverse());
        break;
      case 'toprated':
        setSortData(sortByCategories.sort(sortByRated).reverse());
        break;
      case 'lowestrated':
        setSortData(sortByCategories.sort(sortByRated));
        break;
      case 'aztype':
        setSortData(sortByCategories.sort(sortByAlphabet));
        break;
      case 'zatype':
        setSortData(sortByCategories.sort(sortByAlphabet).reverse());
        break;
      default:
        setSortData(sortByCategories);
        break;
    }
  }, [sortValue, typeValue, context.stateCollections, categoryValue]);

  const handleSubmit = (values) => {
    setSortValue(values.sort);
    setTypeValue(values.type);
    setCategoryValue(values.category);
  };

  return (
    <>
      <PageTitle>My collection</PageTitle>
      <Sort
        setValues={handleSubmit}
        sortOptions={sortOptions}
        typeOptions={typeOptions}
        categoryOptions={categoryOptions}
        initialCategory={categoryValue}
        initialValue={sortValue}
        initalTypeValue={typeValue}
      />
      {sortData.length ? (
        <ul className={styles.collectionList}>
          {sortData.map((c) => (
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
      ) : (
        <span className={styles.collectionNoData}>No data yet!</span>
      )}
    </>
  );
};

export default CollectionView;
