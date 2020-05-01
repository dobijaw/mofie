import React from 'react';
import PropTypes from 'prop-types';
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
        type={type}
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

Button.propTypes = {
  type: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
