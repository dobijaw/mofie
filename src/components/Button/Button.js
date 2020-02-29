import React from 'react';
import styles from './Button.module.scss';

const Button = ({ light, text }) => (
  <button type="button" className={light ? styles.btnLight : styles.btn}>
    {text}
  </button>
);

export default Button;
