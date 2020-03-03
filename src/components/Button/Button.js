import React from 'react';
import styles from './Button.module.scss';

const Button = ({ light, text, handleClick }) => (
  <button
    type="button"
    className={light ? styles.btnLight : styles.btn}
    onClick={handleClick}
  >
    {text}
  </button>
);

export default Button;
