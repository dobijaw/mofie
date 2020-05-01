import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({
  children,
  handleClick,
  additionalClass,
  lightTheme,
  type,
  to,
  id,
}) => (
  <>
    {to ? (
      <Link
        to={to}
        type={type}
        className={`${
          lightTheme ? styles.btnLight : styles.btn
        } ${additionalClass}`}
        data-id={id}
      >
        {children}
      </Link>
    ) : (
      <button
        type={type}
        className={`${
          lightTheme ? styles.btnLight : styles.btn
        } ${additionalClass}`}
        onClick={handleClick}
        data-id={id}
        data-type={type}
      >
        {children}
      </button>
    )}
  </>
);

Button.propTypes = {
  type: PropTypes.string,
  lightTheme: PropTypes.bool,
  children: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
  handleClick: PropTypes.func,
  to: PropTypes.string,
  id: PropTypes.number,
};

Button.defaultProps = {
  type: 'button',
  lightTheme: false,
  additionalClass: '',
  handleClick: null,
  id: null,
  to: '',
};

export default Button;
