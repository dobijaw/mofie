import React from 'react';
import styles from './Button.module.scss';

const Button = ({ text }) => (
  <button type="button" className={styles.btn}>
    {text}
  </button>
);

export default Button;
