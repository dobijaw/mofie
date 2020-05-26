import React from 'react';
import PropTypes from 'prop-types';
import styles from './DateFormat.module.scss';

const DateFormat = ({ children, isSmall }) => (
  <span className={[styles.dateFormat, isSmall && styles.dateFormat___small].join(' ')}>
    {children}
  </span>
);

DateFormat.propTypes = {
  children: PropTypes.string.isRequired,
  isSmall: PropTypes.bool,
};

DateFormat.defaultProps = {
  isSmall: false,
};

export default DateFormat;
