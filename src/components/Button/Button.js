import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({ light, text, id, handleClick, to, type }) => (
  <>
    {to ? (
      <Link
        to={to}
        type="button"
        className={light ? styles.btnLight : styles.btn}
        data-id={id}
      >
        {text}
      </Link>
    ) : (
      <button
        type="button"
        className={light ? styles.btnLight : styles.btn}
        onClick={handleClick}
        data-id={id}
        data-type={type}
      >
        {text}
      </button>
    )}
  </>
);

export default Button;
