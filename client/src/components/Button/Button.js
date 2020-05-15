import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({
  children,
  handleClick,
  className,
  lightTheme,
  type,
  to,
  id,
  asAdd,
  asDelete,
  disabled,
}) => (
  <>
    {to ? (
      <Link
        to={to}
        type={type}
        className={`${lightTheme ? styles.btnLight : styles.btn} ${className}`}
        data-id={id}
      >
        {children}
      </Link>
    ) : (
      <button
        type={type}
        className={`${lightTheme ? styles.btnLight : styles.btn} ${className} ${
          asDelete && styles.btnDelete
        } ${asAdd && styles.btnIcon}`}
        onClick={handleClick}
        data-id={id}
        data-type={type}
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
