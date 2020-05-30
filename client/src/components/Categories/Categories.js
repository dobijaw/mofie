import React, { useContext } from 'react';
import { AppContext } from 'context';
import { deleteCategory } from 'actions/categories';
import NoData from 'components/NoData/NoData';
import styles from './Categories.module.scss';
import CategoriesItem from './CategoriesItem/CategoriesItem';

const Categories = () => {
  const { categories, categoriesDispatch } = useContext(AppContext);

  return (
    <ul className={styles.categories}>
      {console.log(categories)}
      {categories.length ? (
        <>
          {categories.map((item) => (
            <CategoriesItem
              id={item.id}
              key={item.id}
              value={item.value}
              handleDeleteClick={() => deleteCategory(categoriesDispatch, item.id)}
            />
          ))}
        </>
      ) : (
        <NoData>No categories yet</NoData>
      )}
    </ul>
  );
};

export default Categories;
