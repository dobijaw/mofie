import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { AppContext } from 'context';
import { routes } from 'routes';
import { sortOptions, typeOptions } from 'data';

import Sort from 'components/Sort/Sort';
import NoData from 'components/NoData/NoData';
import PageTitle from 'components/PageTitle/PageTitle';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import ProductionItem from 'components/ProductionList/ProductionItem/ProductionItem';
import styles from './CollectionView.module.scss';

const CollectionView = () => {
  const { collection, categories, user } = useContext(AppContext);
  const [isNoCategoryExist, setNoCategoryExist] = useState(false);
  const [initial] = useState({
    categories: [
      {
        id: 'all',
        value: 'ALL',
      },
      ...categories,
    ],
    nocategories: [
      {
        id: 'all',
        value: 'ALL',
      },
      ...categories,
      {
        id: 'nocategory',
        value: 'NO CATEGORY',
      },
    ],
  });

  const [categoryOptions, setCategoriesOptions] = useState(initial.categories);

  useEffect(() => {
    if (isNoCategoryExist) {
      setCategoriesOptions(initial.nocategories);
    } else {
      setCategoriesOptions(initial.categories);
    }
  }, [categories, isNoCategoryExist, initial]);

  useEffect(() => {
    setNoCategoryExist(false);

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

    const sortByCategories = sortByType.filter((c) => {
      if (categoryValue.id === 'all') {
        return c;
      }
      if (categoryValue.id === 'nocategory') {
        return !categories.map((item) => item.id).includes(c.customData?.categoryId);
      }
      return categoryValue.id === c.customData?.categoryId;
    });

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
  }, [sortValue, typeValue, collection, categoryValue, categories]);

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
