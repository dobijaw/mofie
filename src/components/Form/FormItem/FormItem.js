import React from 'react';
import styles from './FormItem.module.scss';

const FormItem = () => (
  <div className={styles.FormItemWrapper}>
    <input type="text" value="input" />
  </div>
);

export default FormItem;
