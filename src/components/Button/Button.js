import React from 'react';
import styles from './Button.module.scss';

const Button = ({ light, text, handleClickFn }) => (
  <button
    type="button"
    className={light ? styles.btnLight : styles.btn}
    onClick={handleClickFn}
  >
    {text}
  </button>
);

export default Button;
