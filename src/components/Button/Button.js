import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({
  light,
  children,
  id,
  handleClick,
  to,
  type,
  additionalClass,
}) => (
  <>
    {to ? (
      <Link
        to={to}
        type="button"
        className={`${light ? styles.btnLight : styles.btn} ${additionalClass}`}
        data-id={id}
      >
        {children}
      </Link>
    ) : (
      <button
        type="button"
        className={`${light ? styles.btnLight : styles.btn} ${additionalClass}`}
        onClick={handleClick}
        data-id={id}
        data-type={type}
      >
        {children}
      </button>
    )}
  </>
);

export default Button;
