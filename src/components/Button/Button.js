import React from 'react';
import styles from './Button.module.scss';

const Button = ({ light, text, id, handleClick }) => (
  <button
    type="button"
    className={light ? styles.btnLight : styles.btn}
    onClick={handleClick}
    data-id={id}
  >
    {text}
  </button>
);

export default Button;
