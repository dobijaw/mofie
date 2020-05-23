import React from 'react';
import styles from './SelectList.module.scss';
import SelectItem from '../SelectItem/SelectItem';

const SelectList = ({ children, options, name, handleItemClick, isVisible }) => {
  return (
    <ul
      className={
        isVisible ? `${styles.selectList} ${styles.selectListVisible}` : styles.selectList
      }
    >
      {options.map((o) => (
        <SelectItem
          className={styles.selectListItem}
          key={o.id}
          id={o.id}
          value={o.value}
          handleClick={() => handleItemClick(name, o)}
        />
      ))}
      {children && (
        <SelectItem className={`${styles.selectListItem} ${styles.selectListItemAdd}`}>
          {children}
        </SelectItem>
      )}
    </ul>
  );
};

export default SelectList;
