import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormError.module.scss';

const FormError = ({ error, className }) => (
  <span className={[styles.formError, className].join(' ')}>{error}</span>
);

FormError.propTypes = {
  error: PropTypes.string.isRequired,
  className: PropTypes.string,
};

FormError.defaultProps = {
  className: '',
};

export default FormError;
