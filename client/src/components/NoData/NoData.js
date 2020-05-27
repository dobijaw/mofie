import React from 'react';
import PropTypes from 'prop-types';
import styles from './NoData.module.scss';

const NoData = ({ children }) => <span className={styles.noData}>{children}</span>;

NoData.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NoData;
