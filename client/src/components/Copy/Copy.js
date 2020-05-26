import React from 'react';
import PropTypes from 'prop-types';
import styles from './Copy.module.scss';

const Copy = ({ children, isSmall }) => (
  <p className={[styles.copy, isSmall && styles.copy___small].join(' ')}>{children}</p>
);

Copy.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  isSmall: PropTypes.bool,
};

Copy.defaultProps = {
  isSmall: false,
};

export default Copy;
