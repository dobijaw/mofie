import React from 'react';
import styles from './PaginationItem.module.scss';

const PaginationItem = ({ value, handleClick, active }) => (
  <li className={styles.paginationItem}>
    {value ? (
      <button
        onClick={handleClick}
        className={[
          styles.paginationItem_button,
          active && styles.paginationItem_button___active,
        ].join(' ')}
      >
        {value}
      </button>
    ) : (
      <span className={styles.paginationItem_nodata}>...</span>
    )}
  </li>
);

export default PaginationItem;
