import React from 'react';
import styles from './PaginationItem.module.scss';

const PaginationItem = ({ children, number, handleClick, active }) => (
  <li className={styles.paginationItem}>
    {number ? (
      <input
        type="button"
        className={`${styles.paginationItemButton} ${
          active && styles.paginationItemButtonActive
        }`}
        value={children}
        onClick={handleClick}
        disabled={active}
      />
    ) : (
      children
    )}
  </li>
);

export default PaginationItem;
