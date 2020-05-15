import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomRating.module.scss';

const CustomRating = ({ children }) => (
  <span className={styles.customRating}>{children}</span>
);

CustomRating.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CustomRating;
