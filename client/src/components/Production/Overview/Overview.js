import React from 'react';
import PropTypes from 'prop-types';
import styles from './Overview.module.scss';

const Overview = ({ lightTheme, children }) => (
  <p className={[styles.overview, lightTheme && styles.overview___light].join(' ')}>
    {children}
  </p>
);

Overview.propTypes = {
  children: PropTypes.string.isRequired,
  lightTheme: PropTypes.bool,
};

Overview.defaultProps = {
  lightTheme: false,
};

export default Overview;
