import React, { useState, useEffect } from 'react';
import AddNewItem from 'components/AddNewItem/AddNewItem';
import styles from './CategoriesItem.module.scss';

const CategoriesItem = ({ value, id, handleDeleteClick }) => {
  const [editVisible, toggleEditVisibility] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    toggleEditVisibility(false);
  }, [data]);

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
        <AddNewItem categoryID={id} getData={(d) => setData(d)} />
      )}
    </li>
  );
};

export default CategoriesItem;