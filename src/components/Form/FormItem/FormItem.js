import React from 'react';
import styles from './FormItem.module.scss';

const FormItem = ({ id, label }) => (
  <div className={styles.FormItemWrapper}>
    <label htmlFor={id}>{label}</label>
    <input id={id} type="text" />
  </div>
);

export default FormItem;
