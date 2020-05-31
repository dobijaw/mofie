import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomRating.module.scss';

const CustomRating = ({ children, isRate }) => (
  <span className={[styles.customRating, isRate && styles.customRating___rate].join(' ')}>
    {children}
  </span>
);

CustomRating.propTypes = {
  isRate: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

CustomRating.defaultProps = {
  isRate: false,
};

export default CustomRating;
