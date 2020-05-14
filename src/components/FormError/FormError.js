import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormError.module.scss';

const FormError = ({ error, className }) => (
  <span className={`${styles.error} ${className}`}>{error}</span>
);

FormError.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
};

FormError.defaultProps = {
  error: '',
  className: '',
};

export default FormError;
