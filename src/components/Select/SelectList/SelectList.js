import React from 'react';
import styles from './SelectList.module.scss';

const SelectList = ({
  children,
  options,
  name,
  handleItemClick,
  isVisible,
}) => {
  return (
    <ul
      className={
        isVisible
          ? `${styles.selectList} ${styles.selectListVisible}`
          : styles.selectList
      }
    >
      {options.map((o) => (
        <li key={o} className={styles.selectListItem}>
          <button
            type="button"
            onClick={() => handleItemClick(name, o)}
            className={styles.selectListButton}
          >
            {o}
          </button>
        </li>
      ))}
      <li className={styles.selectListItem}>{children}</li>
    </ul>
  );
};

export default SelectList;
