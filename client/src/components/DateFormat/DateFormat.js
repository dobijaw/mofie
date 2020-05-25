import React from 'react';
import PropTypes from 'prop-types';
import styles from './DateFormat.module.scss';

const DateFormat = ({ children, isSmall }) => (
  <span
    className={
      isSmall ? [styles.dateFormat, styles.dateFormat___small].join(' ') : styles.dateFormat
    }
  >
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
