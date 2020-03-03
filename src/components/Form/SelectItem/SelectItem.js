import React from 'react';
import styles from './SelectItem.module.scss';

const SelectItem = ({ options }) => (
  <div>
    <select className={styles.select}>
      {options.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
);

export default SelectItem;
