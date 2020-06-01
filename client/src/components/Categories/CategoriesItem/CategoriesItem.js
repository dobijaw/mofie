import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
        <button
          type="button"
          onClick={handleDeleteClick}
          className={styles.categoriesItem_button}
        >
          delete
        </button>
        <button
          type="button"
          onClick={() => toggleEditVisibility(!editVisible)}
          className={styles.categoriesItem_button}
        >
          edit
        </button>
      </div>
      {!editVisible ? (
        <div className={styles.categoriesItem_data}>
          <span className={styles.categoriesItem_category}>{value}</span>
        </div>
      ) : (
        <AddNewItem categoryId={id} getData={(d) => setData(d)} initialValue={value} />
      )}
    </li>
  );
};

CategoriesItem.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default CategoriesItem;
