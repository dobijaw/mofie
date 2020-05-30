import React, { useContext } from 'react';
import { AppContext } from 'context';
import { deleteCategory } from 'actions/categories';
import styles from './Categories.module.scss';
import CategoriesItem from './CategoriesItem/CategoriesItem';

const Categories = () => {
  const { categories, categoriesDispatch } = useContext(AppContext);

  return (
    <ul className={styles.categories}>
      {categories.map((item) => (
        <CategoriesItem
          id={item.id}
          key={item.id}
          value={item.value}
          handleDeleteClick={() => deleteCategory(categoriesDispatch, item.id)}
        />
      ))}
    </ul>
  );
};

export default Categories;
