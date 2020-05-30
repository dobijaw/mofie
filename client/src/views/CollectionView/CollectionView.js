import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from 'context';
import ProductionItem from 'components/ProductionList/ProductionItem/ProductionItem';
import Sort from 'components/Sort/Sort';
import { FETCH_TYPE } from 'types';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import { Redirect } from 'react-router';
import { routes } from 'routes';
import NoData from 'components/NoData/NoData';
import styles from './CollectionView.module.scss';
import PageTitle from '../../components/PageTitle/PageTitle';

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
  const { collection, categories, user } = useContext(AppContext);
  const [isNoCategoryExist, setNoCategoryExist] = useState(false);

  const categoryOptions = [
    {
      id: 'all',
      value: 'ALL',
    },
    ...categories,
  ];

  useEffect(() => {
    collection.forEach((production) => {
      const data = categories.some((i) => i.id === production.customData.categoryId);
      if (!data) setNoCategoryExist(true);
    });
  }, [collection, categories, setNoCategoryExist]);

  const [sortValue, setSortValue] = useState(sortOptions[0]);
  const [categoryValue, setCategoryValue] = useState(categoryOptions[0]);
  const [typeValue, setTypeValue] = useState(typeOptions[0]);
  const [sortData, setSortData] = useState(collection);

  const sortByRated = (a, b) => {
    return +a.customData.rate.value - +b.customData.rate.value;
  };

  const sortByAlphabet = (a, b) => {
    if (a.data.title < b.data.title) return -1;
    if (a.data.title > b.data.title) return 1;

    return 0;
  };

  useEffect(() => {
    const sortByType = collection.filter((c) =>
      typeValue.id === 'alltype' ? c : c.productionType === typeValue.id,
    );

    const sortByCategories = sortByType.filter((c) =>
      categoryValue.id === 'all' ? c : categoryValue.id === c.customData?.categoryId,
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
  }, [sortValue, typeValue, collection, categoryValue]);

  const handleSubmit = (values) => {
    setSortValue(values.sort);
    setTypeValue(values.type);
    setCategoryValue(values.category);
  };

  return (
    <>
      {!user.isAuth && <Redirect to={routes.login} />}

      <MainTemplate>
        <PageTitle center>My collection</PageTitle>
        {console.log(isNoCategoryExist)}
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
          <ul className={styles.collection_list}>
            {sortData.map((c) => (
              <ProductionItem
                _id={c._id}
                key={c.productionId}
                id={c.productionId}
                title={c.data.title}
                genres={c.data.genres}
                releaseDate={c.data.releaseDate}
                image={c.data.image}
                productionType={c.productionType}
                tagline={c.data.tagline}
                rate={c.data.rate}
                customRate={c.customData?.rate?.value}
                customCategory={
                  categories.find((item) => item.id === c.customData?.categoryId)?.value ||
                  'NO CATEGORY'
                }
                noModal
              />
            ))}
          </ul>
        ) : (
          <NoData>No data yet!</NoData>
        )}
      </MainTemplate>
    </>
  );
};

export default CollectionView;
