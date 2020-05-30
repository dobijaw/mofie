import React, { useState, useContext, useEffect } from 'react';
import AddNewItem from 'components/AddNewItem/AddNewItem';
import { AppContext } from 'context';
import styles from './CategoriesItem.module.scss';

const CategoriesItem = ({ value, id, handleDeleteClick }) => {
  const { categories } = useContext(AppContext);
  const [editVisible, toggleEditVisibility] = useState('');

  useEffect(() => toggleEditVisibility(false), [categories]);

  return (
    <li className={styles.categoriesItem}>
      <div className={styles.categoriesItem_buttons}>
        <button type="button" onClick={() => toggleEditVisibility(!editVisible)}>
          edit
        </button>
        <button type="button" onClick={handleDeleteClick}>
          delete
        </button>
      </div>
      {!editVisible ? (
        <div className={styles.categoriesItem_data}>
          <span className={styles.categoriesItem_category}>{value}</span>
        </div>
      ) : (
        <AddNewItem categoryID={id} />
      )}
    </li>
  );
};

export default CategoriesItem;
