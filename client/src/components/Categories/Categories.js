import React, { useContext } from 'react';
import { AppContext } from 'context';
import { deleteCategory } from 'actions/categories';

import NoData from 'components/NoData/NoData';
import CategoriesItem from './CategoriesItem/CategoriesItem';
import styles from './Categories.module.scss';

const Categories = () => {
  const { categories, categoriesDispatch } = useContext(AppContext);

  return (
    <>
      {categories.length ? (
        <ul className={styles.categories}>
          {categories.map((c) => (
            <CategoriesItem
              id={c.id}
              key={c.id}
              value={c.value}
              handleDeleteClick={() => deleteCategory(categoriesDispatch, c.id)}
            />
          ))}
        </ul>
      ) : (
        <NoData>No categories yet</NoData>
      )}
    </>
  );
};

export default Categories;
