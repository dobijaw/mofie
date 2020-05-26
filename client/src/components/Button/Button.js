import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({
  children,
  className,
  handleClick,
  lightTheme,
  disabled,
  asDelete,
  asAdd,
  type,
  to,
  id,
}) => (
  <>
    {to ? (
      <Link
        id={id}
        to={to}
        className={[styles.button, className, lightTheme && styles.button___light].join(' ')}
      >
        {children}
      </Link>
    ) : (
      <button
        id={id}
        type={type}
        className={[
          styles.button,
          lightTheme && styles.button___light,
          asDelete && styles.button___delete,
          asAdd && styles.button___add,
          className,
        ].join(' ')}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    )}
  </>
);

Button.propTypes = {
  type: PropTypes.string,
  lightTheme: PropTypes.bool,
  children: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  to: PropTypes.string,
  id: PropTypes.number,
  asAdd: PropTypes.bool,
  asDelete: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  lightTheme: false,
  className: '',
  handleClick: null,
  id: null,
  to: '',
  asAdd: false,
  asDelete: false,
  children: '',
  disabled: false,
};

export default Button;
