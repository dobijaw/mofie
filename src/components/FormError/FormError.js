import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormError.module.scss';

const FormError = ({ error }) => <span className={styles.error}>{error}</span>;

FormError.propTypes = {
  error: PropTypes.string,
};

FormError.defaultProps = {
  error: '',
};

export default FormError;
