import React from 'react';
import styles from './InputItem.module.scss';

const InputItem = ({ id, label }) => (
  <div className={styles.inputWrapper}>
    <label htmlFor={id} className={styles.inputLabel}>
      {label}
    </label>
    <input
      id={id}
      type="text"
      className={styles.inputItem}
      placeholder="Type here..."
    />
  </div>
);

export default InputItem;
